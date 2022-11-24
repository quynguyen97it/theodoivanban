
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
  apiURL = 'http://localhost:8001';
  errorData: {};
  public redirectUrl: string;
  currentIndex: any = -1;
  showFlag: any = false;
  imageObject: Array<object> = [];

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth_token
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.auth_token = this.getAuthorizationToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.auth_token
      })
    }
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiURL}/api/login`, {username: username, password: password})
    .pipe(
      map(res => {
        if (res.token) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            //this.redirectUrl = '';
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
      return currentUser.token;
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
    return this.http.get(this.apiURL, { headers: headers })
  }

  getUserLogin(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiURL+'/api/user', this.httpOptions)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      })
    )
  }

  showLightbox(index, imgURL) {
    this.imageObject = [{ image: imgURL}];
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
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
