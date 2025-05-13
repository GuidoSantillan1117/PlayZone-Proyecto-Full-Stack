import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Logica } from './Logica';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { JuegosDialogComponent } from '../../../juegos-dialog/juegos-dialog.component';
import { DatabaseService } from '../../../services/database.service';
import { User } from '../../../clases/User';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit {

  dataTrivia: any = null;
  logicaJuego!: Logica;
  perdioSub: any;
  constructor(private apiService : ApiService, private dialog:MatDialog,private router:Router,private supabaseAuth:AuthService,private dbService:DatabaseService)
  {

  }

  ngOnInit() {
    this.apiService.obtenerDatosTrivia().subscribe(data => {
      this.dataTrivia = data;
      this.logicaJuego = new Logica(data.results);
      this.suscribirseAPerdida();
    });
  }


    suscribirseAPerdida(){
    if (this.perdioSub)
      {
        this.perdioSub.unsubscribe();
      } 
    this.perdioSub=this.logicaJuego.perdio$.subscribe(() => {
      this.mostrarDialog();
    });
  }

   async mostrarDialog() {
    
      const user : User | null = this.supabaseAuth.getCurrentUser()
      if(this.logicaJuego.respuestasCorrectas>0)
      {
        await this.dbService.insertarAciertos(user!.id,this.logicaJuego.respuestasCorrectas,"preguntados")
      }
      const dialogRef = this.dialog.open(JuegosDialogComponent, {
        disableClose: true
      });
      dialogRef.componentInstance.correctas = this.logicaJuego.respuestasCorrectas;
      dialogRef.componentInstance.juego = "preguntados";
  
      dialogRef.afterClosed().subscribe(resultado => {
        if (resultado === 'salir') {
          this.router.navigateByUrl("/home")
        } else if (resultado === 'reintentar') {
          this.suscribirseAPerdida(); 
          this.logicaJuego.reiniciarJuego();
        }
      });
    }

}
