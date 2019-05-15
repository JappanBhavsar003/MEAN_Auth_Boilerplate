import { Injectable } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class ShowMsgService {

  constructor(private ngFlashMessageService: NgFlashMessageService) { }

  showMsg(msg : string, type? : string){
    this.ngFlashMessageService.showFlashMessage({
      // Array of messages each will be displayed in new line
      messages: [msg], 
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true, 
      // Time after which the flash disappears defaults to 2000ms
      timeout: 3000,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: type || 'danger'
    });
  }
}
