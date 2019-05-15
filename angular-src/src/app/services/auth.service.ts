import { Injectable } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageHandleService } from './storage-handle.service';
//import { tokenNotExpired } from 'angular2-jwt'; // This dependency is not working in Angular 7
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  jwtHelper = new JwtHelperService();
  envioronment = 'SANDBOX'; //'DEVELOPMENT'; // 'DEVELOPMENT' -> While you develope in locally & 'PRODUCTION' -> When want to deploy to server;


  constructor(private http: HttpClient, 
              private storageHandler: StorageHandleService) { }

  // Register service
  registerUser(user){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    headers.append('Content-Type','application/json');
    return this.http.post<any>(this.envioronment == 'DEVELOPMENT' ? 'http://localhost:3000/users/register' : 'users/register',user, {headers: headers})
            .pipe(map(data => data));
  }

  // Login User Service
  loginUser(cred){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    headers.append('Content-Type','application/json');
    return this.http.post<any>(this.envioronment == 'DEVELOPMENT' ? 'http://localhost:3000/users/authenticate' : 'users/authenticate',cred, {headers: headers})
            .pipe(map(data => data));
  }

  // Get Profile
  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({'Authorization':this.authToken,'Content-Type':'application/json'});    
    //headers.append('Authorization',this.authToken); // This is not working
    //console.log(headers.get('Authorization'));
    //headers.append('Content-Type','application/json');  // This is not working
    //console.log(this.authToken);
    return this.http.get<any>(this.envioronment == 'DEVELOPMENT' ? 'http://localhost:3000/users/profile' : 'users/profile', {headers: headers})
            .pipe(map(data => data));
  }

  logoutUser(){
    this.loadToken();
    let headers = new HttpHeaders({'Authorization':this.authToken,'Content-Type':'application/json'});
    return this.http.get<any>(this.envioronment == 'DEVELOPMENT' ? 'http://localhost:3000/users/logout' : 'users/logout', {headers: headers})
            .pipe(map(data => data));
  }

  loadToken(){
    this.authToken = this.storageHandler.getLocalStorage('id_token');    
  }

  // Set user and authetication for logged in user
  setUserAndAuthValue(data){
    if(data.token){
      this.authToken = data.token;
    }
    if(data.user){
      this.user = data.user;
    }
  }

  // Reser user and token information for this service
  resetUserAndAuthValue(){
    this.authToken = null;
    this.user = null;
  }

  // Logout function
  logout(){
    this.logoutUser().subscribe(data => {
      console.log(data);
      this.resetUserAndAuthValue();
      this.storageHandler.clearAllDataFromLocalStorage(); 
    });
    
  }

  isTokenExpired(){
    this.loadToken();
    return this.jwtHelper.isTokenExpired(this.authToken);
  }

}
