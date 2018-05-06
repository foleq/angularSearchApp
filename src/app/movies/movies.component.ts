import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie.model';
import { MoviesService } from './movies.service';
import { ConfigService, IFilter, IFilterKind } from '../services/config.service';

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

  constructor(private moviesService: MoviesService,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
    this.allFilters = this.configService.getAllFilters();
    this.selectedFilters = this.allFilters.filter(f => f.isDefault);
  }

  search(searchPhrase: string): void {
    this.moviesService.search(searchPhrase).subscribe(movies => {
      this.movies = movies;
    });
  }

  addFilter() {
    let filterToBeAdded = this.getFilterToBeAdded();
    if(filterToBeAdded != null){
      this.selectedFilters[this.selectedFilters.length] = filterToBeAdded;
    }
  }

  hasFilterToBeAdded(): boolean {
    return this.selectedFilters.length < this.allFilters.length;
  }

  private getFilterToBeAdded(): IFilter {
    for (const filter of this.allFilters) {
      if(this.selectedFilters.filter(f => f.name === filter.name).length === 0){
        return filter;
      }
    }
    return null;
  }

  getAvailableFilters(selectedFilter: IFilter): IFilter[] {
    let availableFilters = [];
    for (const filter of this.allFilters) {
      if(filter === selectedFilter || this.selectedFilters.filter(f => f.name === filter.name).length === 0){
        availableFilters.push(filter);
      }
    }
    return availableFilters;
  }

  removeFilter(selectedFilter: IFilter): void {
    this.selectedFilters.forEach((filter, index) => {
      if(filter === selectedFilter) {
        this.selectedFilters.splice(index, 1);
      }
    });
  }

  filterChanged(previouslySelectedFilter: IFilter, selectedFilter: IFilter) {
    selectedFilter.filterKind = previouslySelectedFilter.filterKind;
    //previouslySelectedFilter.filterKind = IFilterKind.include;
  }
}