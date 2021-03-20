import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToDoItem } from './todoitem.interface';
import * as moment from 'moment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Setting } from './setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private url: string = "/api/Setting"

  constructor(private http: HttpClient) { }

  //get

  getSettings(): Observable<Setting> {
    return this.http.get<Setting>(this.url).pipe(
      catchError(this.handleError)
    );
  }



     //post
  saveSettings(setting: Setting): Observable<Setting> {
    return this.http.post<Setting>(this.url, setting).pipe(
      catchError(this.handleError)
    );
  }

  //put

  updateSettings(setting: Setting): Observable<any> {
    return this.http.put(this.url, setting).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    if (error.status === 404) {
      return throwError('No Items Found.')
    }
    if (error.status === 401) {
      return throwError('Username/Password incorrect, please try again')
    }
    if (error.status === 400) {
      return throwError('Account requirements: Username must be unique.  Password must be at least 8 characters, with at least one uppercase, one lowercase, and one special character.')
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
