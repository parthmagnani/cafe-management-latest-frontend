import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient,) { }

  public postDataWithHeader<T>(url: string, toAdd: any) {
    const token: string | null = this.getToken();
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ?? ''
        })
    };
    return this.http.post(url, toAdd, httpOptions).pipe(
        catchError(this.handleError)
    );
}


  public postDataWithoutHeader<T>(url: string, toAdd: any) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // timeZoneOffset: this.getTimeZoneOffset()
        })
    };
    return this.http.post(url, toAdd, httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  public getDataWithHeader<T>(url: string) {
    const token: string | null = this.getToken();
    console.log("THis is token", token)
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token ?? ''
        })
    };
    return this.http.get(url, httpOptions).pipe(
        catchError(this.handleError)
    );
}



  getToken() {
    let AuthToken = localStorage.getItem('userToken');

    return AuthToken;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(error);
} 
}
