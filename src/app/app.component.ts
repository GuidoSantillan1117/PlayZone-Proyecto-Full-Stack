import { Component ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navegation/navbar/navbar.component'; 
import { O } from '@angular/cdk/keycodes';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial1';

  constructor(private authService: AuthService){

  }


}

