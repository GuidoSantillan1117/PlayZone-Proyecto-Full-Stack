
import { Respuesta } from "./Respuesta";
import { Subject } from 'rxjs';


export class Logica{
    perdio$ = new Subject<void>();
    arrayData :any = [];
    preguntaActual : any;
    pregunta : string;
    repetidas : number [] = []
    respuestasActuales : any [4] = []
    respuestasCorrectas = 0;

    constructor(data: any[]) {
        this.pregunta = "";
        this.arrayData = data || [];
        this.elegirPregunta();
    }

    getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
      }

    seleccionarPregunta(index:number)
    {
        this.preguntaActual = this.arrayData[index]
    }
    crearRespuestas() 
    {
        const listaRespuestas: Respuesta[] = [];
        this.pregunta = this.preguntaActual.question;
        const respuestaCorrecta = new Respuesta(this.preguntaActual.correct_answer, true);
        listaRespuestas.push(respuestaCorrecta);

        for (let element of this.preguntaActual.incorrect_answers)
        {
            const respuesta = new Respuesta(element, false);
            listaRespuestas.push(respuesta);
        }
        return listaRespuestas;
    }


    seleccionarRespuestas() 
    {
        const listaRespuestas = this.crearRespuestas();
        this.respuestasActuales = listaRespuestas.sort(()=>Math.random()-0.5);
    }

    verificarRespuesta(respuesta:Respuesta)
    {
        console.log(respuesta.valido);
        respuesta.elegida = true;
        if(respuesta.valido)
        {
            this.respuestasCorrectas ++
            this.elegirPregunta();
        }

        else{
            this.perdio$.next()
        }
    }


    elegirPregunta()
    {
        let randomIndex = this.getRandomInt(40);

        while(this.repetidas.includes(randomIndex))
        {
            randomIndex = this.getRandomInt(40);
        }

        this.repetidas.push(randomIndex)
        this.seleccionarPregunta(randomIndex)
        this.seleccionarRespuestas()
    }

    reiniciarJuego()
    {
        this.repetidas = [];
        this.elegirPregunta()
        this.respuestasCorrectas = 0;
    }
}