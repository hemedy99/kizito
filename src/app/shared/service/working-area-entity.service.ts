import { WorkingArea } from './../models/working-area.model';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models/paginated-response.model';


@Injectable({providedIn: 'root'})
export class WorkingAreaEntityService extends EntityCollectionServiceBase<WorkingArea> {
  page$: Observable<Pagination>;
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('WorkingArea', serviceElementsFactory);
    this.page$ = this.selectors$['page$'];
  }
}
