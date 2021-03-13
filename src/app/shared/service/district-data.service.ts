import { District } from './../models/district.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class DistrictDataService extends DefaultDataService<District> {
  private apiBaseUrl = 'http://41.73.213.144:8650/api/District';
  constructor(
    http: HttpClient,
    urlGenerator: HttpUrlGenerator,
    private notificationsService: NotificationsService
  ) {
    super('WorkingArea', http, urlGenerator);
  }


  getById(id: string): Observable<District> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  getAll(): Observable<District[]> {
    const url = `${this.apiBaseUrl}`;
    return this.http.get<District[]>(url).pipe(
      map((res: any) => res)
    );
  } 

}