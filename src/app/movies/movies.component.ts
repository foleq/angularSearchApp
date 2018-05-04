import { Component, OnInit } from '@angular/core';
import { IMovie } from './movie.model';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [
    MoviesService
  ]
})
export class MoviesComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  search(searchPhrase: string) {
    this.moviesService.searchMovies(searchPhrase).subscribe(movies => {
      this.movies = movies;
    });
  }
}
