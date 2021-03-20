import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToDoItem } from './todoitem.interface';
import * as moment from 'moment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TodoitemService {
  private url: string = "/api/TodoItem"

  constructor(private http: HttpClient) { }

  //get

  getItem(id: number): Observable<ToDoItem> {
    const url = `${this.url}/${id}`;
    return this.http.get<ToDoItem>(url).pipe(
      catchError(this.handleError)
    );
  }


  getAllItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.url).pipe(
        catchError(this.handleError)
      );
  }

  
  getItems(searchString: string): Observable<ToDoItem[]> {
    let params = new HttpParams().set("name", searchString);
    return this.http.get<ToDoItem[]>(this.url, { params: params }).pipe(
      catchError(this.handleError),
      map<ToDoItem[], ToDoItem[]>((items) => {
        items.forEach(todoitem => todoitem.Created = moment.utc(todoitem.Created).local().toDate())
        return items;
      })
    )
  }

  //delete
  deleteItem(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }



  //post
  saveItem(todoitem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.url, todoitem).pipe(
      catchError(this.handleError)
    );
  }

  //put

  updateItem(todoitem: ToDoItem): Observable<any> {
    return this.http.put(this.url, todoitem).pipe(
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
   
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  
}
