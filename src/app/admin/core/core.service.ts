import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  // Open a snackbar with the provided message and action text.
  openSnackBar(message: string, action: string = 'ok') {

  // Set the duration of the snackbar to 2 sec.
  // Position the snackbar at the top of the screen.

    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
    // Open a snackbar and hold it until the user clicks the "OK" button
    openSnackBarWithConfirmation(message: string, action: string = 'ok'): void {
  
      // Open the snackbar with the formatted message
      const snackBarRef = this._snackBar.open(message, action, {
        verticalPosition: 'top',
        duration: undefined, // Hold until user action
      });
  
      // Attach a callback to the afterDismissed event to perform actions after the snackbar is dismissed
      snackBarRef.afterDismissed().subscribe(() => {
        // Do something after the snackbar is dismissed
        console.log('Snackbar dismissed');
      });
    }
}
