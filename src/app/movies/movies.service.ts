import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { IMovie } from './movie.model';

@Injectable()
export class MoviesService {
  private moviesUrl: string = 'http://localhost:3000/api/movies';
  private searchUrl: string = 'http://localhost:3000/api/search';
  private handleError: HandleError;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('MoviesService');
  }

  getMovies() : Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.moviesUrl)
      .pipe(
        catchError(this.handleError<IMovie[]>('getMovies', []))
      );
  }

  searchMovies(searchPhrase: string): Observable<IMovie[]> {
    const body = {
      searchPhrase: searchPhrase
    };
    return this.http.post<IMovie[]>(this.searchUrl, body, this.httpOptions)
      .pipe(
        catchError(this.handleError<IMovie[]>('searchMovies', []))
      );
  }
}
