import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  openSnackBar(message: string, action = 'Chiudi'): void {
    this.snackBar.open(message, action);
  }
}
