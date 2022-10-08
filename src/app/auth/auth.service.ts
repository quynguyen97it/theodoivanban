
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_token = this.getAuthorizationToken();
  serverUrl = 'http://192.168.1.25:8001';
  errorData: {};
  public redirectUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}/api/login`, {username: username, password: password})
    .pipe(
      map(res => {
        if (res.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = '';
          }

        } else {
          throw new Error('Valid token not returned');
        }
      })
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
    else{
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getLoggedInUser(auth_token): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(this.serverUrl, { headers: headers })
  }

  getUserLogin(): Observable<Users[]> {
    return this.http.get<Users[]>(this.serverUrl+'/api/user', this.httpOptions)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      })
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    const err = new Error(errorMessage);
    return throwError(errorMessage);
 }
}
