export class Respuesta{
    valor:string;
    valido : boolean;
    elegida : boolean;
    constructor(valor:string,valido:boolean)
    {
        this.valor = valor
        this.valido = valido
        this.elegida = false;
    }

    elegir()
    {
        this.elegida = true;
    }
}