import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private supabaseService:SupabaseService) { 

  }

  async insertSignUp(id:string|undefined,name:string,sur_name:string,age:number,mail:string)
  {
    const {data,error} = await this.supabaseService.supabase
    .from('users')
    .insert([
      { id: id, name: name, sur_name: sur_name,age:age,mail:mail}
    ]);
    return {data,error};
  }

  async insertarPuntuacion(id:string|undefined,score:number,table:string)
  {
    const {data,error} = await this.supabaseService.supabase
    .from(table)
    .insert([{
      id:id,score:score
    }])
    return {data,error};
  }

  async insertarAciertos(id:string|undefined,aciertos:number,table:string)
  {
    const {data,error} = await this.supabaseService.supabase
    .from(table)
    .insert([{
      id:id,correctas:aciertos
    }])
    return {data,error};
  }

  async traerPuntuacion(table:string)
  {
    const {data} = await this.supabaseService.supabase
    .from(table)
    .select("id,id_user,score,users(name)")
    .order("score",{ascending:false})

    return data
  }

  async traerAciertos(table:string)
  {
    const {data} = await this.supabaseService.supabase
    .from(table)
    .select("id,id_user,correctas,users(name)")
     .order("correctas",{ascending:false})

    return data
  }

  async searchById(id:string){
    const {data} = await this.supabaseService.supabase
    .from('users')
    .select('*')
    .eq("id",id)
    .single();

    return{data}
  }

  async traerMensajes()
  {
    const {data} = await this.supabaseService.supabase
    .from("mensajes")
    .select("id,user_id,mensaje,created_at,users(name)")
    .order("created_at",{ascending:true})

    return data
  }

  async guardarMensaje(mensaje:string,userId:string)
  {
    const {data} = await this.supabaseService.supabase.
    from("mensajes")
    .insert({
      mensaje:mensaje, user_id : userId,
    })
  }

  async traerRanking(table:string)
  {
     const {data} = await this.supabaseService.supabase.
     from(table).
     select("id_user,id,score,dificultad,users(name)")
     .order('score',{ascending: false});
     return {data};

  }
}
