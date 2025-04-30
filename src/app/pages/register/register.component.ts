import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  isValidMail:boolean = true;
  isValidName:boolean = true;
  isValidSurName:boolean = true;
  isValidAge:boolean = true;
  isValidPassword:boolean = true;
  isValidConfirmPassword:boolean = true;

  
  constructor(private supabaseAuth:AuthService,private dbService:DatabaseService,
              private router:Router,private snackBar: MatSnackBar)
              {

  }

  async register()
  {
    let nameOK = this.validateLenght("name",this.name,2,12)
    let surNameOk = this.validateLenght("surname",this.surname,2,12)
    let ageOk = this.validateAge()
    let mailOk = this.validateMail()
    let passwordOk = this.validateLenght("password",this.password,6,14)
    let passwordConfirmOk = this.validateConfirmPassword()
    


    if(nameOK&&surNameOk&&ageOk&&mailOk&&passwordOk&&passwordConfirmOk)
    {
      const {data,error} = await this.supabaseAuth.signUp(this.mail,this.password)
      if(!error)
      {
        const {error} = await this.dbService.insertSignUp(data.user?.id,this.name,this.surname,this.age,this.mail)
        if(!error)
          {
            this.supabaseAuth.logIn(this.mail,this.password)
            this.snackBar.open("Usuario creado correctamente. Bienvenido a PlayZone", '', {
              duration: 3000, 
              panelClass: ['snackbar'] 
            });
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 3200);
            
        }
      }
      else if(error.message =="User already registered")
      {
        this.snackBar.open("Este correo ya esta registrado.", '', {
          duration: 3000, 
          panelClass: ['snackbar'] 
        });
      }
    }
  }


    /*************************************************************** */

  validateLenght(field:string,data:string,min:number,max:number): boolean {
    let isValid = data.length >= min && data.length <= max;

    if (field === "name") {
      this.isValidName = isValid;
    } else if (field === "surname") {
      this.isValidSurName = isValid;
    } else if (field === "password") {
      this.isValidPassword = isValid;
    } else if (field === "mail") {
      this.isValidMail = isValid;
    }
  
    return isValid;
  }


  validateAge():boolean {
  const ageCast = Number(this.age);
  const isValid = !isNaN(ageCast) && ageCast > 15 && ageCast < 110;

  this.isValidAge = isValid;
  return isValid;
}

validateMail():boolean {
  const regex = /^[^\s@]{6,}@[^\s@]+\.[^\s@]+$/;
  const isValid = regex.test(this.mail);

  this.isValidMail = isValid;
  return isValid;
}
  
  validateConfirmPassword(){
    const isValid = this.passwordConfirm == this.password;
    this.isValidConfirmPassword = isValid;
    return isValid;

  }
}

