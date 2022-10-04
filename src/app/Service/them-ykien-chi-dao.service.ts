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

@Injectable({
  providedIn: 'root'
})
export class ThemYKienChiDaoService {
  private apiURL = 'https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.apiURL)
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
