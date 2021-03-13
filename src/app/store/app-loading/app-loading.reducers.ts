import { createReducer, on } from '@ngrx/store';
import { appLoading } from './app-loading.actions';

export const appLoadingFeatureKey = 'appLoading';
export interface State {
  isAppLoading: boolean;
}
export const initialState: State = {
  isAppLoading: false
};

export const reducer = createReducer(
  initialState,
  on(appLoading, (state, { isAppLoading }) => ({
    ...state,
    isAppLoading
  }))
);
