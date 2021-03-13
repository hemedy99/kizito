import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router.state';
import { ApplicationState } from 'src/app/store';
import { RouterReducerState } from '@ngrx/router-store';

export const selectRouterState = createFeatureSelector<
  ApplicationState,
  RouterReducerState<RouterStateUrl>
>('router');
