import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { JuegosDialogComponent } from '../../../juegos-dialog/juegos-dialog.component';
import { Logica } from './Logica';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';
import { User } from '../../../clases/User';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  logica: Logica;

  constructor(private dialog:MatDialog,private router:Router,private supabaseAuth:AuthService,private dbService:DatabaseService) {
    this.logica = new Logica();
  }

  ngOnInit(): void {
    this.logica.perdio$.subscribe(()=>{
      this.mostrarDialog();
    });
  }

   async mostrarDialog() {
    
      const user : User | null = this.supabaseAuth.getCurrentUser()
      console.log(user)
      const {data,error} = await this.dbService.insertScore(user!.id,user!.name,this.logica.jugador.score,"ahorcado")
    
      const dialogRef = this.dialog.open(JuegosDialogComponent, {
        disableClose: true
      });
      dialogRef.componentInstance.scoreJugador = this.logica.jugador.score;
  
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado === 'salir') {
          this.router.navigateByUrl("/home")
        } else if (resultado === 'reintentar') {
          this.logica.restartJuego(true)
        }
      });
    }
}
