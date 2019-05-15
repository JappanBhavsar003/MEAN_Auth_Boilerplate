import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHandleService {

  constructor() { }

  // Set data to Local Storage
  setLocalStorage(uniqueName : string, data: any){
    if(uniqueName && data){
      window.localStorage.setItem(uniqueName,JSON.stringify(data));      
      return true;
    }else{
      return false;
    }
  }

  // Get data from Local Storage
  getLocalStorage(uniqueName: string){
    if(uniqueName){
      return JSON.parse(window.localStorage.getItem(uniqueName));      
    }else{
      return '';
    }
  }

  // Remove Data
  removeLocalStorage(uniqueName: string){
    if(uniqueName){
      window.localStorage.removeItem(uniqueName);
      return true;
    }else{
      return false;
    }
  }

  // Clear all data from localstorage
  clearAllDataFromLocalStorage(){
    window.localStorage.clear();
  }
}
