import { Component ,inject,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navegation/navbar/navbar.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { O } from '@angular/cdk/keycodes';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { Subscription } from 'rxjs';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,CommonModule,FormsModule,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  isLogged : boolean = false;
  chatAbierto: boolean = false;
  private authSub!: Subscription;


  title = 'parcial1';

  constructor(private supabaseAuth: AuthService){
    this.authSub = this.supabaseAuth.isLoggedIn$.subscribe(logged =>{
      this.isLogged = logged
      if(!this.isLogged)
      {
        this.chatAbierto =false;
      }
    })
  }

  abrirChat()
  {
    this.chatAbierto = !this.chatAbierto
  }


}

