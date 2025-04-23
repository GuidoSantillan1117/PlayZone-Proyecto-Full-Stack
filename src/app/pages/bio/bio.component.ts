import { Component,OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-bio',
  imports: [],
  standalone:true,
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.css'
})
export class BioComponent implements OnInit{

  constructor(private gitHubService:GithubService) {
  
  }
  async ngOnInit(){

  }


  async getUserInfo(){
    console.log("xd")
  }

}


