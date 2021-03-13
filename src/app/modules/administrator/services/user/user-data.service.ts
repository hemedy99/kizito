import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { UserRequest,UserResponse } from '../../models/user.model';
import { Pagination } from 'src/app/shared/models/paginated-response.model';
import { CustomUtilityService } from 'src/app/shared/service/custom-utility.service';

@Injectable({providedIn: 'root'})
export class UserRequestDataService extends DefaultDataService<UserRequest> {
  private apiBaseUrl = 'http://41.73.213.144:8650/api/User';
  constructor(
    http: HttpClient,
    urlGenerator: HttpUrlGenerator,
    private notificationsService: NotificationsService
  ) {
    super('UserRequest', http, urlGenerator);
  }

  add(body: any) {
    return this.http
      .post<UserRequest>(
        this.apiBaseUrl,
        body
      )
      .pipe(
        map((res: any) => (res.data))
      );
  }

}


@Injectable({providedIn: 'root'})
export class UserResponseDataService extends DefaultDataService<UserResponse> {
  private apiBaseUrl = 'http://41.73.213.144:8650/api/User';
  constructor(
    http: HttpClient,
    urlGenerator: HttpUrlGenerator,
    private notificationsService: NotificationsService
  ) {
    super('UserResponse', http, urlGenerator);
  }


  getById(id: string): Observable<UserResponse> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  getAll(): Observable<UserResponse[]> {
    const url = `${this.apiBaseUrl}`;
    return this.http.get<UserResponse[]>(url).pipe(
      map((res: any) => res)
    );
  } 

}