import { Bot } from "./Bot";
import { Jugador } from "./Jugador";
import {Letra} from "./Letra"
import { Subject } from 'rxjs';


export class Logica{

    perdio$ = new Subject<void>();
    tematica : any;
    palabra :string  = "";
    palabraJugador :string [] = []
    tematicasInfo = ["futbol","musica","paises"]
    abecedario: string[] = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'
      ];
    arrayLetras : Letra[] = [];

    bot : Bot;
    jugador: Jugador;

    dataTematica = [{tema:"futbol",palabras: ["cancha","pelota","gol","arquero","defensor"]},
                    {tema:"musica",palabras:["cancion","ritmo","guitarra","cantante","bateria"]},
                    {tema:"paises",palabras:["argentina","brasil","chile","uruguay","ecuador"]}]


    constructor() {
        this.bot = new Bot();
        this.jugador = new Jugador();
        this.agregarLetras();
        this.seleccionarTematica()
        this.seleccionarPalabra();
        this.palabraJugador = Array(this.palabra.length).fill(' ');
    }



    getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
      }
    
    seleccionarTematica(){
        this.tematica = this.tematicasInfo[this.getRandomInt(this.tematicasInfo.length)]
    }

    seleccionarPalabra()
    {
        for (let element of this.dataTematica) {
            if(element.tema === this.tematica)
            {
                const index = this.getRandomInt(element.palabras.length)
                this.palabra = element.palabras[index]
                element.palabras.splice(index, 1)
                break
            
            }
        }
        console.log(this.palabra)
    }

    agregarLetras (){
        for (let element of this.abecedario) {
            const letra = new Letra()
            letra.valor = element
            this.arrayLetras.push(letra)
        }
    }

    verificarOpcion(letra:Letra){
        let index = 0
        const letrasPalabra = this.palabra.split('');
        let valido = false;
        for(let element of letrasPalabra)
        {
            if(letra.valor == element)
            {
                this.reproducirSonidoError('/sucess.mp3')
                valido = true;

                letra.valido = true;
                this.palabraJugador[index] = letra.valor
                this.jugador.score +=10
                if (this.verificarGano())
                {
                    this.reproducirSonidoError('/level-win.mp3')
                    this.restartJuego();
                }
                
            }
            index ++
        }

        if(!valido){
            letra.validoError = true;
            this.reproducirSonidoError('/error-sound.mp3')
            this.jugador.perderVida()
            this.bot.avanzarFase(this.jugador.vidas)

            if(this.jugador.verificarPerdio())
            {
                this.reproducirSonidoError('/failure.mp3')
                this.perdio$.next()
            }

        }

    }

    verificarGano()
    {
        let retorno = false;
        const palabra = this.palabraJugador.join('');

        if(palabra == this.palabra)
        {
            retorno = true;
        }

        return retorno;
        
    }

    verificarPerdio()
    {
        console.log(this.jugador.vidas);
        return this.jugador.vidas = 0;
    }

    restartJuego(perdio?:boolean)
    {
        this.bot.restartFases();
        this.jugador.restablecerVidas();
        this.restartLetras();
        this.seleccionarTematica()
        this.seleccionarPalabra();
        this.palabraJugador = Array(this.palabra.length).fill(' ');

        if (perdio)
        {

            this.dataTematica =  [{tema:"futbol",palabras: ["cancha","pelota","gol","arquero","defensor"]},
            {tema:"musica",palabras:["cancion","ritmo","guitarra","cantante","bateria"]},
            {tema:"paises",palabras:["argentina","brasil","chile","uruguay","ecuador"]}]
            this.jugador.score = 0;
        }

    }

    restartLetras()
    {
        for(let element of this.arrayLetras)
        {
            element.valido = false;
            element.validoError = false;
            
        }
    }

    reproducirSonidoError(path:string) {
        const audio = new Audio();
        audio.src = path;
        audio.load();
        audio.play();
      }
}