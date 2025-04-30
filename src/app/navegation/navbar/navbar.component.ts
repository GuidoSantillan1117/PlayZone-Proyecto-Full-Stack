import { Component } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogged : boolean = false;
  private authSub!: Subscription;

  constructor(private supabaseAuth:AuthService,private supabaseService:SupabaseService,private router:Router){
    this.authSub = this.supabaseAuth.isLoggedIn$.subscribe(logged =>{
      this.isLogged = logged
    }

    )
  }
  async logOut()
  {
    const {data} = await this.supabaseService.supabase.auth.getUser()
    if(data.user != null)
    {
      const {error} = await this.supabaseAuth.signOut()
      if(!error)
      {
        console.log("no hubo error")
      }
    }
  }



}
