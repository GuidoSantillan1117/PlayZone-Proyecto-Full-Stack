export class Jugador{
    vidas : number;
    score : number;

    constructor() {
        this.vidas = 3
        this.score = 0;
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
}