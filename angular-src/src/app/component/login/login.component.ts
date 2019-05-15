import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {ShowMsgService} from '../../services/show-msg.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageHandleService } from '../../services/storage-handle.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;

  constructor(private validateService : ValidateService, 
              private showMsgService: ShowMsgService,
              private authService : AuthService,
              private router : Router,
              private storageHandler : StorageHandleService) { }

  ngOnInit() {
  }

  onLoginSubmit(){

    const credential = {
      username: this.username,
      password: this.password
    };

    // Validate credentials
    if(!this.validateService.validateUserCred(credential)){
      this.showMsgService.showMsg('Please fill in all fields');
      return false;
    }

    // Authentocation for user
    this.authService.loginUser(credential).subscribe(data => {
      console.log(data);
      if(data.success){
        this.showMsgService.showMsg('Welcome! ' + data.user.name,'success');
        this.storageHandler.setLocalStorage('user',data);
        this.storageHandler.setLocalStorage('id_token', data.token);
        this.authService.setUserAndAuthValue(data);
        this.router.navigate(['/dashboard']);
      }else{
        this.showMsgService.showMsg('Username / Password not valid');
        this.authService.resetUserAndAuthValue()
        this.router.navigate(['/login']);
      }
    });


  }

}
