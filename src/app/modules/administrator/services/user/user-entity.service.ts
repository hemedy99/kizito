import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { Pagination } from '../../../../shared/models/paginated-response.model';
import { UserRequest,UserResponse } from '../../models/user.model';

@Injectable({providedIn: 'root'})
export class UserRequestEntityService extends EntityCollectionServiceBase<UserRequest> {
  page$: Observable<Pagination>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserRequest', serviceElementsFactory);
    this.page$ = this.selectors$['page$'];
  }
}

@Injectable({providedIn: 'root'})
export class UserResponseEntityService extends EntityCollectionServiceBase<UserResponse> {
  page$: Observable<Pagination>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserResponse', serviceElementsFactory);
    this.page$ = this.selectors$['page$'];
  }
}

