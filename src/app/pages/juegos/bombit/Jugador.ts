export class Jugador{
    vidas : number;
    score : number;
    acierto : number;

    constructor() {
        this.vidas = 3
        this.score = 0;
        this.acierto = 0;
    }

    restablecerVidas(){
        this.vidas = 3;
    }

    perderVida()
    {
        this.vidas -=1
    }

    verificarPerdio(){
        return this.vidas === 0;
    }

    sumarScore(puntuacion:number)
    {
        this.score += puntuacion
    }
    reiniciarScore()
    {
        this.score = 0;
    }

    sumarAcierto()
    {
        this.acierto +=1
    }

    reiniciarAciertos()
    {
        this.acierto = 0;
    }
}