import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  ConfirmDialogModel,
  ConfirmComponent
} from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
export interface ConfirmMessage {
  title: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone,
    public dialog: MatDialog
  ) {}

  default(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string) {
    this.show(message, {
      duration: 5000,
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string) {
    this.show(message, {
      duration: 5500,
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string) {
    this.show(message, {
      duration: 7000,
      panelClass: 'error-notification-overlay'
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  }
  /**
   * Shows Confirmation Dialog
   * @param confirmMessage is object of type ConfirmMessage
   */

  confirmDialog(confirmMessage: ConfirmMessage): boolean {
    let dialogResult: boolean;
    const dialogData = new ConfirmDialogModel(
      confirmMessage.title,
      confirmMessage.message
    );
    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: '500px',
      data: dialogData
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((dialogResult) => {
        // this.confirmResult = dialogResult;
        dialogResult = dialogResult;
      });
    return dialogResult;
  }
}
