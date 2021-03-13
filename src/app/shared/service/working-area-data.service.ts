import { WorkingArea } from './../models/working-area.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class WorkingAreaDataService extends DefaultDataService<WorkingArea> {
  private apiBaseUrl = 'http://41.73.213.144:8650/api/WorkingArea';
  constructor(
    http: HttpClient,
    urlGenerator: HttpUrlGenerator,
    private notificationsService: NotificationsService
  ) {
    super('WorkingArea', http, urlGenerator);
  }


  getById(id: string): Observable<WorkingArea> {
    const url = `${this.apiBaseUrl}/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  getAll(): Observable<WorkingArea[]> {
    const url = `${this.apiBaseUrl}`;
    return this.http.get<WorkingArea[]>(url).pipe(
      map((res: any) => res)
    );
  } 

}