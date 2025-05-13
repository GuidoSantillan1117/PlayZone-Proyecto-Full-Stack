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
    if(this.logica.jugador.aciertos >0)
    {
       await this.dbService.insertarAciertos(user!.id,this.logica.jugador.aciertos,"mayor_menor")
    }
  
    const dialogRef = this.dialog.open(JuegosDialogComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.correctas = this.logica.jugador.aciertos;
    dialogRef.componentInstance.juego = "mayor-menor";

  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado === 'salir') {
        this.router.navigateByUrl("/home")
      } else if (resultado === 'reintentar') {
        this.logica.resetear(true)
      }
    });
  }
}
