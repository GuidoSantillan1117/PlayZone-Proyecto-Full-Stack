export class Bot{
    fase :number = 0;

    constructor() {

    }

    public restartFases()
    {
        this.fase = 0;
    }

    public avanzarFase(vidaJugador:number){

        if (vidaJugador == 3)
        {
            this.fase = 0
        }
        else if(vidaJugador === 2)
        {
            this.fase =1

        }
        else if(vidaJugador === 1)
        {
            this.fase=2
        }
        else if(vidaJugador === 0)
        {
            this.fase =3
        }

    }
}