import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {  
  user : Object;

  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      //console.log(data);
      if(data){
        this.user = data.data;
      }
    },err =>{
      console.log('Error -: ', err);
    })
  }

}
