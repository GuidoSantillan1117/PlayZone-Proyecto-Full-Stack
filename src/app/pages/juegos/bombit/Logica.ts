import { Casillero } from "./Casillero";
import { Jugador } from "./Jugador";
import { Subject } from 'rxjs';

export class Logica{
    perdio$ = new Subject<void>();
    dificultades :  string [] =  ["facil","medio","dificil"]
    dificultad : string = "";
    indexDificultad : number;
    jugador : Jugador;
    cantidadBombas : number;
    listaCasilleros : Casillero [] = []
    constructor(){
        this.jugador = new Jugador()
        this.indexDificultad = 0;
        this.seleccionarDificultad();
        this.cantidadBombas =  this.contarBombas();
        this.iniciarJuego();
    }

    getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }

    crearCasillero()
    {
        this.listaCasilleros = []; 
        for(let i =0;i<12;i++)
        {
            const casillero = new Casillero()
            this.listaCasilleros.push(casillero)
        }
    }

    seleccionarDificultad()
    {
        this.dificultad = this.dificultades[this.indexDificultad];
    }

    seleccionarBombas()
    {
        const listaRepetidos : number[]= [];

        for(let i =0;i<this.cantidadBombas;i++)
        {
            let randomIndex = this.getRandomInt(this.listaCasilleros.length)

            while(listaRepetidos.includes(randomIndex))
            {
                randomIndex = this.getRandomInt(this.listaCasilleros.length)
            }
            listaRepetidos.push(randomIndex);
            this.listaCasilleros[randomIndex].makeBomb();
            
        }
    }

    contarBombas()
    {
        switch(this.dificultad)
        {
            case  "facil":
                return 3
            case "medio":
                return 4
            default:
                return 5
        }
    }

    seleccionarCasillero(casillero:Casillero)
    {
        casillero.pressed = true;
        casillero.showCasillero();
        if(this.verificarBomba(casillero))
        {
            this.reproducirSonido("/fail.mp3")
            this.jugador.perderVida();
            if(this.jugador.verificarPerdio())
            {
                this.perdio$.next()
                setTimeout(() => {
                    this.reproducirSonido("/gameover.mp3")
                },700) 
            }
        }
        else{
            this.reproducirSonido("/diamante_sonido.mp3")
            this.jugador.sumarAcierto();
            this.jugador.sumarScore(50)
            console.log(this.jugador.acierto)
            console.log(this.cantidadBombas)

            if(this.jugador.acierto + this.cantidadBombas === 12)
            {
                console.log("entre")
                this.ganarRonda();
            }
        }


    }

    verificarBomba(casillero:Casillero){
        return casillero.type ==="bomb"
    }

    iniciarJuego()
    {
        this.crearCasillero();
        this.cantidadBombas = this.contarBombas();
        this.seleccionarBombas();
        this.jugador.restablecerVidas()
    }
    reiniciarJuego(perdio?:boolean)
    {
        if(perdio)
        {
            this.jugador.reiniciarScore();
            this.indexDificultad = 0;
            this.seleccionarDificultad()
        }
        this.iniciarJuego();
        this.jugador.reiniciarAciertos();

    }


    ganarRonda()
    {

        this.jugador.sumarScore(200);
        if(this.dificultad !== "dificil")
        {
            this.reproducirSonido("/winlevel.mp3")
            this.indexDificultad +=1
            this.seleccionarDificultad()
            this.cantidadBombas = this.contarBombas();
        }
        this.reiniciarJuego();
    }

    reproducirSonido(path:string) {
        const audio = new Audio();
        audio.src = path;
        audio.load();
        audio.play();
      }


}