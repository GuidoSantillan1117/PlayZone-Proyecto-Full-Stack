import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-bio',
  imports: [FormsModule,CommonModule],
  standalone:true,
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css'
})
export class BioComponent implements OnInit{

  imagenAvatar : string ;
  nombre : string;
  bio : string;
  constructor(private apiService:ApiService) {
    this.imagenAvatar = "";
    this.nombre = "";
    this.bio = "";

  
  }
  async ngOnInit(){
    this.apiService.obtenerDatosGithub().subscribe(data=>{
      this.nombre = data.name;
      this.imagenAvatar = data.avatar_url
      this.bio = data.bio;

    });

  }


}


