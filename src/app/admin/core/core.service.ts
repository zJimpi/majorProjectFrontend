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
}
