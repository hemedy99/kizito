import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, appLoadingFeatureKey } from './app-loading.reducers';

export const selectAppLoading = createFeatureSelector<State>(
  appLoadingFeatureKey
);
export const selectAppLoadingState = createSelector(
  selectAppLoading,
  (state): boolean => state.isAppLoading
);
