
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_token = '10112|2dYtdI07bSHDtyj5kXbXHh47d6NX5HyBCjEnXWSM';
  serverUrl = 'http://192.168.1.25:8001';
  errorData: {};

  constructor(private http: HttpClient) { }

  redirectUrl: string;

  login(username: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}/api/login`, {username: username, password: password})
    .pipe(map(user => {
        if (user && user.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          this.auth_token = currentUser.data.token;
        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    if (localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return currentUser.data.token;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    alert(error.error.data.error);
    return error.error.data.error;
  }

  getLoggedInUser(auth_token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.serverUrl, { headers: headers })
  }

  getAll(): Observable<Users[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
    console.log(this.auth_token);
    return this.http.get<Users[]>(`${this.serverUrl}/api/user`, { headers: headers })
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
