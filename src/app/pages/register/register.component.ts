import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  mail:string = "";
  password:string = "";
  passwordConfirm:string="";
  name: string = "";
  surname:string = "";
  age :any = "";

  
  constructor(private supabaseAuth:AuthService,private dbService:DatabaseService,
              private router:Router)
              {

  }

  async register()
  {
      const {data,error} = await this.supabaseAuth.signUp(this.mail,this.password)
      console.log(error?.message)
      if(!error)
      {
        const {error} = await this.dbService.insertSignUp(data.user?.id,this.name,this.surname,this.age)
        if(!error)
          {
            this.router.navigateByUrl('/home');
          }
      }
      else{
        console.log("Ya esta registrado")
      }
    
  }


    /*************************************************************** */
  validateLenght(data:string,max:number)
  {
    return data.length>5 && data.length<max;
  }
}

