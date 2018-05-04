import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IMovie } from './movie.model';

@Injectable()
export class MoviesService {
  private moviesUrl: string = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) {
  }

  getMovies() : Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.moviesUrl);
  }
}
