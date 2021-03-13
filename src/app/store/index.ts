import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../core/router/router.state';
import { environment } from '../../environments/environment';
import * as fromAppLoading from './app-loading/app-loading.reducers';

export interface ApplicationState {
  ['router']: RouterReducerState<RouterStateUrl>;
  [fromAppLoading.appLoadingFeatureKey]: fromAppLoading.State;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  ['router']: routerReducer,
  [fromAppLoading.appLoadingFeatureKey]: fromAppLoading.reducer,

};

export const metaReducers: MetaReducer<
  ApplicationState
>[] = !environment.production ? [] : [];
