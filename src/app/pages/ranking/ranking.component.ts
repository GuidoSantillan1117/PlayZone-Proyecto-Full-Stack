import { Component,OnInit,signal } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule,FormsModule],
  standalone :true,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit{

  tipoPuntuacion: boolean;
  rankingActual : string;
  indice = 0;
  ranking = signal<any>([]);


  constructor(private dbService : DatabaseService)
  {
    this.rankingActual = "ahorcado";
    this.tipoPuntuacion = true;
  }

    ngOnInit(): void {
    this.traerRanking("puntuacion","ahorcado")
  }

  async traerRanking(tipo:string,tabla:string)
  {
    this.rankingActual = tabla;
    this.indice = 0;
    let data;
    if (tipo === "puntuacion")
    {
      this.tipoPuntuacion = true;
      data = await this.dbService.traerPuntuacion(tabla)
    }
    else{
       data = await this.dbService.traerAciertos(tabla)
       this.tipoPuntuacion = false;
    }
    this.ranking.set(data)
  }

}

