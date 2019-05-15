import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {ShowMsgService} from '../../services/show-msg.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string;
  username: string;
  email: string;
  password: string;

  constructor(private validateService : ValidateService, 
              private showMsgService: ShowMsgService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {  
      name: this.name,
      username: this.username,  
      email: this.email,
      password: this.password
    };

    // Required fields
    if(!this.validateService.validateRegister(user)){
      this.showMsgService.showMsg('Please fill in all fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.showMsgService.showMsg('Please enter valid email');
      return false;
    }

    if(!this.validateService.validatePassword(user.password)){
      this.showMsgService.showMsg('Please make sure that your passwor is contains 6 to 20 characters '+ 
            ', at least one numeric digit, one uppercase and one lowercase.');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      //console.log(data);
      if(data.success){
        this.showMsgService.showMsg('You are now registered and can login!','success');
        this.router.navigate(['/login']);
      }else{
        this.showMsgService.showMsg(data.msg || 'Something went wrong!');
        this.router.navigate(['/register']);
      }
    });
  }

}
