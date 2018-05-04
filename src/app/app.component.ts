import { Component, OnInit } from '@angular/core';

import { IMovie } from './movies/movie.model';
import { MoviesService } from './movies/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App title';

  constructor(){
  }

  ngOnInit(): void {
  }
}
