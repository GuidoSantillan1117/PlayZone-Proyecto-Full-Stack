import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Router ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule,],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mail:string;
  password:string;

  isValidMail:boolean = true;
  isValidPassword:boolean = true;

  data = [
    { mail: "usuariotest1@gmail.com", password: "123123" },
    { mail: "usuariotest2@gmail.com", password: "123123" },
    { mail: "usuariotest3@gmail.com", password: "123123" }
  ];

  constructor(private supabaseAuth:AuthService,private router :Router,private snackBar: MatSnackBar){

    this.mail ="";
    this.password ="";

  }


  async login()
  {

    let mailOk = this.validateMail()
    let passwordOk = this.validatePassword()

    if (mailOk&&passwordOk)
    {
      const formatedMail = this.mail.replace(/\s/g, "");
      const formatedPassword = this.password.replace(/\s/g, "");
      const {error} = await this.supabaseAuth.logIn(formatedMail,formatedPassword)
      if(error)
      {
        this.snackBar.open("No se encontró una cuenta con esos datos.", '', {
          duration: 3000, 
          panelClass: ['snackbar'] 
        });
        
      }
      else{
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 1500);
      }
    }
  }
  validateMail()
  {
    let retorno = false;
    const emailRegex = /^[^\s@]{6,}@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.mail)){
      this.setValidationFlags("mail",true)
      retorno = true;
    }
    else{
      this.setValidationFlags("mail",false)
    }
    return retorno;
  }

  validatePassword()
  {
    let retorno = false;
    if(this.validateLenght(this.password,15))
    {
      this.setValidationFlags("password",true)
      retorno = true;
    }
    else{
      this.setValidationFlags("password",false)
    }

    return retorno;
  }

  setValidationFlags(field:string,isValid: boolean) {
    if (field =="password")
    {
      this.isValidPassword = isValid;
    }
    else{
      this.isValidMail = isValid;
    }
  }

  validateLenght(data:string,max:number)
  {
    return data.length>5 && data.length<max;
  }
  
  fillCamps(index:number){
    this.mail = this.data[index].mail;
    this.password = this.data[index].password;
  }


}
