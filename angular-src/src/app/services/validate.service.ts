import { Injectable } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(!user.name || !user.password || !user.username || !user.email){
          return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  validateUserCred(cred){
    if(!cred || !cred.username || !cred.password){
      return false;
    }else{
      return true;
    }
  }

  validatePassword(password){
    if(password){
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return passwordRegex.test(password);
    }else{
      return false;
    }
  }

}
