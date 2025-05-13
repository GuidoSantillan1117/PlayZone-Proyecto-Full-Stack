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
  public juego = "";
  public scoreJugador :number = 0;
  public correctas : number = 0;
  constructor(private dialogRef: MatDialogRef<JuegosDialogComponent>) {

  }

  get mensajeFinal(): string {
  switch (this.juego) {
    case 'preguntados':
      return `Has respondido ${this.correctas} preguntas correctamente.¿Qué te gustaría hacer?`;
    case 'mayor-menor':
      return `Has acertado ${this.correctas} veces. ¿Qué te gustaría hacer?`;
    case 'bombit':
      return `Has hecho ${this.scoreJugador} puntos. ¿Qué te gustaría hacer?`;
    case 'ahorcado':
      return `Has hecho ${this.scoreJugador} puntos. ¿Qué te gustaría hacer?`;
    default:
      return `¿Qué te gustaría hacer?`;
  }
}

  salir() {
    this.dialogRef.close('salir');
  }

  reintentar() {
    this.dialogRef.close('reintentar');
  }
}
