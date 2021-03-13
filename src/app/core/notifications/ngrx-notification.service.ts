import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  EntityAction,
  EntityCacheAction,
  ofEntityOp,
  OP_ERROR,
  OP_SUCCESS
} from '@ngrx/data';
import { filter } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';

/** Report ngrx-data success/error actions as toast messages * */
@Injectable({ providedIn: 'root' })
export class NgrxNotificationService {
  constructor(actions$: Actions, notificationsService: NotificationsService) {
    actions$
      .pipe(
        ofEntityOp(),
        filter(
          (ea: EntityAction) =>
            ea.payload.entityOp.endsWith(OP_SUCCESS) ||
            ea.payload.entityOp.endsWith(OP_ERROR)
        )
      )
      // this service never dies so no need to unsubscribe
      .subscribe((action) => {
        let emilius = action.payload.entityOp.split('/');
        const actionType = emilius[emilius.length - 1];
        let errorMessage = '';
        if (action.payload.entityOp.endsWith(OP_ERROR)) {
          errorMessage = action.payload.data.error.error
            ? action.payload.data.error.error.error
              ? action.payload.data.error.error.error.message
              : action.payload.data.error.error.message
            : action.payload.data.error.error.message;

          //check if there is validations errors
          if (
            action.payload.data.error.error &&
            action.payload.data.error.error.status == 400
          ) {
            errorMessage +=
              ' [ ' +
              action.payload.data.error.error.error.error.join(' , ') +
              ' ] ';
          }

          if (action.payload.data.error.error.status === 401) {
            return notificationsService.error(
              `Error:  ${action.payload.data.error.error.error.error_description}`
            );
          } else {
            return notificationsService.error(`Error:  ${errorMessage}`);
          }
        }
        if (action.payload.entityOp.endsWith(OP_SUCCESS)) {
          if(!!action.payload.tag){
            if (action.payload.tag === 'NoSuccess') {
              return null;
            } else {
              return notificationsService.success(
                `Success: ${action.payload.tag}`
              );
            }
          } else {
            return notificationsService.success(
              `Success: ${action.payload.entityName}`
            );
          }
        }
      });

    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_SUCCESS,
          EntityCacheAction.SAVE_ENTITIES_ERROR
        )
      )
      .subscribe((action: any) => {
        console.log('EntityCacheAction', action);
        return notificationsService.default(
          `${action.type} - url: ${action.payload.url} SaveEntities`
        );
      });
  }
}
