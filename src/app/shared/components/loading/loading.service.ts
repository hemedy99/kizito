import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../../store';
import { appLoading } from '../../../store/app-loading/app-loading.actions';
import { selectAppLoadingState } from '../../../store/app-loading/app-loading.selectors';

@Injectable()
export class LoadingService {
  constructor(private store: Store<ApplicationState>) {}
  loading$: Observable<boolean> = this.store.pipe(
    select(selectAppLoadingState)
  );
  showSpinnerUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }
  loadingStart() {
    this.store.dispatch(appLoading({ isAppLoading: true }));
  }
  loadingEnd() {
    this.store.dispatch(appLoading({ isAppLoading: false }));
  }
}
