import { Observable } from 'rxjs/Observable';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorDialogService {
  constructor(private errorDialog: MatDialog) { }
  public open(code: Number): Observable<boolean> {
    let dialogRef: MatDialogRef<ErrorDialogComponent>;
    dialogRef = this.errorDialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { code: code, description: this.getErrorDescription(code) }
    });
    return dialogRef.afterClosed();
 }

 private getErrorDescription(code: Number): String {
   switch (code) {
      case 0: {
        return 'Service at backend not running';
      }
      case 401: {
        return 'User Unauthorized';
      }
      case 400: {
        return 'Bad Request';
      }
      case 403: {
        return 'Forbidden Resource';
      }
      case 404: {
        return 'Resource Not Found';
      }
      case 500: {
        return 'Internal Server Error';
      }
    }
    return 'Unknown Error';
 }

}
