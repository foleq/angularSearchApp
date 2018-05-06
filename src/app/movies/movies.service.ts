import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';
import { IMovie } from './movie.model';

const searchUrl: string = 'http://localhost:3000/api/search';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class MoviesService {
  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('MoviesService');
  }

  getMovies() : Observable<IMovie[]> {
    return this.searchMovies('getMovies', '');
  }

  search(searchPhrase: string): Observable<IMovie[]> {
    return this.searchMovies('searchMovies', searchPhrase);
  }

  private searchMovies(operation: string, searchPhrase: string){
    const body = {
      searchPhrase: searchPhrase
    };
    return this.http.post<IMovie[]>(searchUrl, body, httpOptions)
      .pipe(
        catchError(this.handleError<IMovie[]>(operation, []))
      );
  }
}
