import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _snackBar: MatSnackBar) {}

  show(message: string): void {
    this._snackBar.open(message, 'Fechar', {
      horizontalPosition: 'right',
      duration: 3500,
    });
  }
}
