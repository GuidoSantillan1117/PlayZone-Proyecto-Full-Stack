import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mail:string;
  password:string;

  constructor(private supabaseAuth:AuthService,private router :Router){

    this.mail ="";
    this.password ="";

  }


  async login()
  {
    const formatedMail = this.mail.replace(/\s/g, "");
    const formatedPassword = this.password.replace(/\s/g, "");
    const {error} = await this.supabaseAuth.logIn(formatedMail,formatedPassword)
    if(error)
    {
      alert("error") 
    }
    else{
      this.router.navigateByUrl('/home');
    }
  }


}
