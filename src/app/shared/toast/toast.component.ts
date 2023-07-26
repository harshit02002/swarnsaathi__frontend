import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TOAST_TYPES } from 'src/app/const';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  message:string;
  type:TOAST_TYPES;
  customClass = {
    'success' : 'toast-success',
    'error' : 'toast-error',
    'info' : 'toast-info'
  };
  title:string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any, 
     private readonly snackBarRef:MatSnackBarRef<any>
  ) { 
    this.message = data.message;
    this.type = data.type;
    this.title = data.title;
  }
 
  close(){
    this.snackBarRef.dismissWithAction()
  }
 
  cssClass() {  
    if(this.type === TOAST_TYPES.Success){
      return this.customClass['success'];
    }  
    else if(this.type === TOAST_TYPES.Error){
      return this.customClass['error'];
    }  
    else if(this.type === TOAST_TYPES.Notify){
      return this.customClass['info'];
    }  
    return this.customClass['info'];
  }   
}
