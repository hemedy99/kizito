import { UserType } from './../models/user-type.model';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models/paginated-response.model';


@Injectable({providedIn: 'root'})
export class UserTypeEntityService extends EntityCollectionServiceBase<UserType> {
  page$: Observable<Pagination>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserType', serviceElementsFactory);
    this.page$ = this.selectors$['page$'];
  }
}
