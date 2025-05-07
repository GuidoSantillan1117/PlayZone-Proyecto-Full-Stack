import { Component, OnInit } from '@angular/core';
import { Logica } from './Logica';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosDialogComponent } from '../../../juegos-dialog/juegos-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { DatabaseService } from '../../../services/database.service';
import { User } from '../../../clases/User';

import { Router } from '@angular/router';

@Component({
  selector: 'app-mayor-menor',
  imports: [FormsModule,CommonModule],
  standalone : true,
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit{

  logica : Logica;
  constructor(private dialog:MatDialog,private router:Router,private supabaseAuth:AuthService,private dbService:DatabaseService)
  {
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
    const {data,error} = await this.dbService.insertScore(user!.id,user!.name,this.logica.jugador.score,"mayor_menor")
  
    const dialogRef = this.dialog.open(JuegosDialogComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.scoreJugador = this.logica.jugador.score;

  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'salir') {
        this.router.navigateByUrl("/home")
      } else if (resultado === 'reintentar') {
        this.logica.resetear(true)
      }
    });
  }
}
