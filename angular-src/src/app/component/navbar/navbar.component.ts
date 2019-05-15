import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {ShowMsgService} from '../../services/show-msg.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private authService : AuthService,
              private msgService : ShowMsgService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.msgService.showMsg('You have been successfully logged out!','success');
    this.router.navigate(['/login']);
    return false; // Return false is necessary because it will prevent '/#' routing to default routing in angular 
  }

}
