import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserCreds } from './user-login/user-creds';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private url: string = "/api/login"

  constructor(private http: HttpClient) { }

  login(userCreds: UserCreds): Observable<any> {
    return this.http.post(this.url, userCreds).pipe(
      catchError(this.handleError)
    );
  }

  createUser(userCreds: UserCreds): Observable<any> {
    return this.http.post(this.url + '/create', userCreds).pipe(
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
