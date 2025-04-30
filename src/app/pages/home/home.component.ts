import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Router ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../clases/User';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule,RouterModule],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLogged : boolean = false;
  currentUser: User | null = null;
  private authSub!: Subscription;

  
  constructor(private supabaseAuth:AuthService,private router :Router,private snackBar: MatSnackBar,private dbService:DatabaseService){
    this.authSub = this.supabaseAuth.isLoggedIn$.subscribe(logged =>{
      this.isLogged = logged
    })
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo(){
    const {data:userData} = await this.supabaseAuth.getUser()
    if(userData.user){
      const {data:userInfo} = await this.dbService.searchById(userData.user.id)
      if(userInfo)
      {
        this.currentUser = new User(userInfo.id,userInfo.name,userInfo.sur_name,userInfo.age,userInfo.mail); 
      }
    }
  }

}
