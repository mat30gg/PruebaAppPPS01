import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  mensajeError(message: string) {
    this.showSnackBar(message, '', 'snackbar-warning')
  }

  showSnackBar(message: string, action: string = '', color: string|string[] = 'snackbar-success') {
    this.matSnackBar.open(message, action, {
      duration: 2000,
      panelClass: color
    })
  }

  
}
