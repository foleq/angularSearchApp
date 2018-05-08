import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie.model';
import { MoviesService } from './movies.service';
import { ConfigService, IFilter, IFilterKind } from '../services/config.service';
import { ISelectItem } from '../my-select/my-select.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { interval } from 'rxjs/observable/interval';
import { bufferCount } from 'rxjs/operators/bufferCount';
import { map } from 'rxjs/operators/map';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [
    MoviesService,
    ConfigService
  ]
})
export class MoviesComponent implements OnInit {
  movies: IMovie[] = [];
  allFilters: IFilter[] = [];

  selectedFilters: IFilter[] = [];
  selectedFiltersValues$: Observable<ISelectItem[]>[] = [];
  private selectedFiltersValuesSubjects$: Subject<ISelectItem[]>[] = [];

  filterKindSelectItems: ISelectItem[];

  filterSelectItems$: Observable<ISelectItem[]>;
  private filterSelectItems: ISelectItem[];
  private filterSelectItemsSubject$: Subject<ISelectItem[]>;

  constructor(
    private moviesService: MoviesService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
    this.allFilters = this.configService.getAllFilters();
    this.selectedFilters = this.allFilters.filter(f => f.isSelected);
    this.fillFilterSelectItems();
    this.filterSelectItemsSubject$ = new BehaviorSubject<ISelectItem[]>(this.filterSelectItems);
    this.filterSelectItems$ = this.filterSelectItemsSubject$.pipe();

    this.filterKindSelectItems = [
      {
        id: IFilterKind.include,
        text: 'Include'
      },
      {
        id: IFilterKind.exclude,
        text: 'Exclude'
      }
    ];

    for (let index = this.selectedFiltersValues$.length; index < this.allFilters.length; index++) {
      const subject = new BehaviorSubject<ISelectItem[]>([]);
      this.selectedFiltersValuesSubjects$.push(subject);
      this.selectedFiltersValues$.push(subject.pipe());
    }
    this.updateFilterAvailableValuesSelectItems();
  }

  private getfilterSelectItems() {
    this.allFilters.map<ISelectItem>(f => {
      return {
        id: f.name,
        text: f.name,
        disabled: f.isSelected === true
      };
    });
  }

  getFilterKindSelectItem(selectedFilter: IFilter): ISelectItem {
    return this.filterKindSelectItems.filter(x => x.id === selectedFilter.filterKind)[0];
  }

  filterKindChanged(selected: ISelectItem, selectedFilter: IFilter) {
    selectedFilter.filterKind = selected.id === IFilterKind.include ? IFilterKind.include : IFilterKind.exclude;
  }

  getFilterSelectItem(selectedFilter: IFilter): ISelectItem {
    return this.filterSelectItems.filter(x => x.id === selectedFilter.name)[0];
  }

  filterChanged(selected: ISelectItem, selectedFilterIndex: number, previouslySelectedFilter: IFilter) {
    this.clearFilter(previouslySelectedFilter);

    const filter = this.allFilters.filter(x => x.name === selected.id)[0];
    filter.isSelected = true;
    this.selectedFilters[selectedFilterIndex] = filter;

    this.updateFilterSelectItems();
    this.updateFilterAvailableValuesSelectItems();
  }

  addFilter() {
    const filterToBeAdded = this.getFilterToBeAdded();
    if (filterToBeAdded != null) {
      filterToBeAdded.isSelected = true;
      this.selectedFilters.push(filterToBeAdded);
      this.updateFilterSelectItems();
      this.updateFilterAvailableValuesSelectItems();
    }
  }

  private getFilterToBeAdded(): IFilter {
    for (const filter of this.allFilters) {
      if (this.selectedFilters.filter(f => f.name === filter.name).length === 0) {
        return filter;
      }
    }
    return null;
  }

  hasFilterToBeAdded(): boolean {
    return this.selectedFilters.length < this.allFilters.length;
  }

  removeFilter(selectedFilter: IFilter): void {
    this.selectedFilters.forEach((filter, index) => {
      if (filter === selectedFilter) {
        this.selectedFilters.splice(index, 1);
      }
    });
    this.clearFilter(selectedFilter);
    this.updateFilterSelectItems();
    this.updateFilterAvailableValuesSelectItems();
  }

  private clearFilter(filter: IFilter) {
    filter.filterKind = IFilterKind.include;
    filter.isSelected = false;
    filter.values = [];
  }

  private updateFilterSelectItems() {
    this.fillFilterSelectItems();
    this.filterSelectItemsSubject$.next(this.filterSelectItems);
  }

  private fillFilterSelectItems() {
    this.filterSelectItems = this.allFilters.map<ISelectItem>(f => {
      return {
        id: f.name,
        text: f.name,
        disabled: f.isSelected === true
      };
    });
  }

  private updateFilterAvailableValuesSelectItems() {
    for (let index = 0; index < this.selectedFilters.length; index++) {
      const selectItems = this.getFilterAvailableValuesSelectItems(this.selectedFilters[index]);
      this.selectedFiltersValuesSubjects$[index].next(selectItems);
    }
  }

  private getFilterAvailableValuesSelectItems(filter: IFilter): ISelectItem[] {
    return filter.availableValues.map<ISelectItem>(f => {
      return {
        id: f,
        text: f
      };
    });
  }

  search(searchPhrase: string): void {
    this.moviesService.search(searchPhrase).subscribe(movies => {
      this.movies = movies;
    });
  }
}
