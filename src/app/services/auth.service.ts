import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private supabaseService:SupabaseService,private router:Router) { 
    this.checkChange();
    }

  private async checkChange(){
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this._isLoggedIn.next(true);
      } else {
        this._isLoggedIn.next(false);
      }
    });
  }

  async logIn(email: string, password: string) {
    return await this.supabaseService.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return await this.supabaseService.supabase.auth.signUp({ email, password });
  }

  async getUser()
  {
    const { data} = await this.supabaseService.supabase.auth.getUser();
    return {data}
  }

  async signOut() {
    return this.supabaseService.supabase.auth.signOut()
  }

  async getSession() {
    return this.supabaseService.supabase.auth.getSession();
  }
}

