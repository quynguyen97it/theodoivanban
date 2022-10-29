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

@Injectable({
  providedIn: 'root'
})
export class ThemYKienChiDaoService {

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  getImplementationOfficer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.authService.apiURL+'/api/canbothuchien',this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getCoordinationOfficer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.authService.apiURL+'/api/canbophoihop',this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createDocument(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/themvanbanchidao', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createDocumentFromFile(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/themdschidao', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createDocumentFromImage(formData): Observable<any[]> {
    return this.httpClient.post<any[]>(this.authService.apiURL+'/api/quetthemhinhanhchidao', formData, this.authService.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getUnapprovedTextList(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.authService.apiURL+'/api/danhsachvanbanchuaduyet',this.authService.httpOptions)
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
