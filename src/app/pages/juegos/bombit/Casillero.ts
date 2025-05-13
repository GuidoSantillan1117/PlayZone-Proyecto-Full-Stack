export class Casillero{
    type : string;
    show : boolean;
    pressed : boolean;

    constructor()
    {
        this.pressed = false;
        this.type = "coin"
        this.show = false;
    }

    makeBomb()
    {
        this.type = "bomb"
    }

    showCasillero() 
    {
        this.show = !this.show
    }
}