import { District } from './../models/district.model';

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models/paginated-response.model';


@Injectable({providedIn: 'root'})
export class DistrictEntityService extends EntityCollectionServiceBase<District> {
  page$: Observable<Pagination>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('District', serviceElementsFactory);
    this.page$ = this.selectors$['page$'];
  }
}