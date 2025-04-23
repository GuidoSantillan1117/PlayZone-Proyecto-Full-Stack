import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private supabaseService:SupabaseService) { 

  }

  async insertSignUp(id:string|undefined,name:string,sur_name:string,age:number)
  {
    const {data,error} = await this.supabaseService.supabase
    .from('users')
    .insert([
      { id: id, name: name, sur_name: sur_name,age:age}
    ]);
    return {data,error};
  }
}
