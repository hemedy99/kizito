import { createAction, props } from '@ngrx/store';

export const appLoading = createAction(
  '[APP COMPONENT] Router Navigation Start',
  props<{ isAppLoading: boolean }>()
);
