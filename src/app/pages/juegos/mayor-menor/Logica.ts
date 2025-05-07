import { Jugador } from "./Jugador";
import { Bot } from "./Bot";
import { Subject } from 'rxjs';


export class Logica{
    valoresPosibles : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
    bot : Bot;
    acerto:boolean;
    fallo:boolean;
    empato:boolean;
    jugador:Jugador;
    perdio$ = new Subject<void>();
    constructor()
    {
        this.acerto = false;
        this.fallo = false;
        this.empato = false;
        this.bot = new Bot()
        this.jugador = new Jugador();
        this.generarNumero(this.bot)
        this.generarNumero(this.jugador)
    }

    getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
      }
    
    generarNumero(obj:Bot | Jugador){
        obj.valor = this.valoresPosibles[this.getRandomInt(this.valoresPosibles.length)]
    }

    verificarNumero(operacion:string)
    {
        this.mostrarCarta()
        let jugadorValor = this.jugador.valor
        let botValor = this.bot.valor

        if (jugadorValor === botValor)
        {
            this.empato = true;
            setTimeout(() => {
                this.resetear()
              }, 3000)
        }
        else if ((operacion === "mayor" && jugadorValor > botValor) || (operacion === "menor" && jugadorValor < botValor)) {
            this.jugador.score += 50;
            this.acerto = true;
            
            setTimeout(() => {
                this.resetear()
              }, 3000);
            
        } 
          else {
            this.fallo = true;
            this.perdio$.next()
            }
    
    }

    mostrarCarta()
    {
        this.bot.mostrar = true;
    }


    resetear(perdio?:boolean){
        this.bot.mostrar = false;
        this.fallo = false;
        this.acerto = false;
        this.empato = false;
        this.generarNumero(this.bot)
        this.generarNumero(this.jugador)
        
        if(perdio)
        {
            this.bot.mostrar = false;
            this.jugador.score = 0;
        }

    }
}