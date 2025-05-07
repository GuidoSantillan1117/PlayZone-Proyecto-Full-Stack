import { Component } from '@angular/core';
import { MatDialogRef,MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-juegos-dialog',
  imports: [MatDialogActions,MatDialogContent,MatButtonModule],
  standalone :true,
  templateUrl: './juegos-dialog.component.html',
   styleUrl: './juegos-dialog.component.css'

})
export class JuegosDialogComponent {

  public scoreJugador :number = 0;
  constructor(private dialogRef: MatDialogRef<JuegosDialogComponent>) {

  }

  salir() {
    this.dialogRef.close('salir');
  }

  reintentar() {
    this.dialogRef.close('reintentar');
  }
}
