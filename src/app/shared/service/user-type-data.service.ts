import { UserType } from './../models/user-type.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Pagination } from 'src/app/shared/models/paginated-response.model';
import { CustomUtilityService } from 'src/app/shared/service/custom-utility.service';


@Injectable({providedIn: 'root'})
export class UserTypeDataService extends DefaultDataService<UserType> {
  private apiBaseUrl = 'http://41.73.213.144:8650/api/UserType';
  constructor(
    http: HttpClient,
    urlGenerator: HttpUrlGenerator,
    private notificationsService: NotificationsService
  ) {
    super('UserType', http, urlGenerator);
  }


  getById(id: string): Observable<UserType> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  getAll(): Observable<UserType[]> {
    const url = `${this.apiBaseUrl}`;
    return this.http.get<UserType[]>(url).pipe(
      map((res: any) => res)
    );
  } 

}