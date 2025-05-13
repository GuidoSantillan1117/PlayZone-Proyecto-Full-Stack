import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Logica } from './Logica';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { JuegosDialogComponent } from '../../../juegos-dialog/juegos-dialog.component';

import { DatabaseService } from '../../../services/database.service';
import { User } from '../../../clases/User';

@Component({
  selector: 'app-bombit',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './bombit.component.html',
  styleUrl: './bombit.component.css'
})
export class BombitComponent implements OnInit {

  logicaJuego : Logica
  constructor(private dialog:MatDialog,private router:Router,private supabaseAuth:AuthService,private dbService:DatabaseService)
  {
    this.logicaJuego = new Logica()
    this.logicaJuego.iniciarJuego();
  }

  ngOnInit(): void {
    this.logicaJuego.perdio$.subscribe(()=>{
      this.mostrarDialog();
    });
  }

   async mostrarDialog() {
    
      const user : User | null = this.supabaseAuth.getCurrentUser()
      if (this.logicaJuego.jugador.score>0)
      {
        await this.dbService.insertarPuntuacion(user!.id,this.logicaJuego.jugador.score,"bombit")
      }
      const dialogRef = this.dialog.open(JuegosDialogComponent, {
        disableClose: true
      });
      dialogRef.componentInstance.scoreJugador = this.logicaJuego.jugador.score;
      dialogRef.componentInstance.juego = "bombit";
  
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado === 'salir') {
          this.router.navigateByUrl("/home")
        } else if (resultado === 'reintentar') {
          this.logicaJuego.reiniciarJuego(true)
        }
      });
    }
}
