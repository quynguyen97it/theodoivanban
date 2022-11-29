import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { CoordinationOfficerList } from '../models/coordination-officer-list';
import { ImplementationOfficerList } from '../models/implementation-officer-list';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { MenuRoles } from '../models/menu-roles';
import { Menu } from '../models/menu';
import { OfficialDispatchTravels } from '../models/official-dispatch-travels';
import { ProgressFile } from '../models/progress-file';
import { SummaryList } from '../models/summary-list';
import { Tag } from '../models/tag';
import { Users } from '../models/users';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ThongKeService {

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notifyService : NotificationService,
  ) { }

  getStatistical(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/thongke', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getStatisticalDetail(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/chitietthongke', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createDirective(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/themchidao', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getDataSearch(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/tracuuthongke', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  showToasterSuccess(message, title){
    this.notifyService.showSuccess(message, title);
  }

  showToasterError(message, title){
      this.notifyService.showError(message, title);
  }

  showToasterInfo(message, title){
      this.notifyService.showInfo(message, title);
  }

  showToasterWarning(message, title){
      this.notifyService.showWarning(message, title);
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
