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

  async insertScore(id:string|undefined,name:string,score:number,table:string)
  {
    const {data,error} = await this.supabaseService.supabase
    .from(table)
    .insert([{
      id:id,name:name,score:score
    }])
    return {data,error};

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
    .select("id,mensaje,created_at,users(name)")

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
}
