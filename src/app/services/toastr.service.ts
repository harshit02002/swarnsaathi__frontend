import { Injectable } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { DEFAULT_TOAST_TIME, TOAST_TYPES } from '../const';
import { ToastComponent } from '../shared/toast/toast.component';
 
@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private _snackBar: MatSnackBar) { }
 
  success(
   title:string,
   message:string,
   duration:number
  ) {
    this._snackBar.openFromComponent(ToastComponent,{
      duration,
      horizontalPosition:'right',
      verticalPosition:'top',
      data:{
        message,
        title,
        type:TOAST_TYPES.Success
      }
    })
  }
 
  error(
    title:string,
    message:string,
    duration?:number
  ) {
    this._snackBar.openFromComponent(ToastComponent,{
      duration: duration ?? DEFAULT_TOAST_TIME,
      horizontalPosition:'right',
      verticalPosition:'top',
      data:{
        message,
        title,
        type:TOAST_TYPES.Error
      }
    })
  }
 
  notify(
    title:string,
    message:string,
    duration:number
  ) {
    this._snackBar.openFromComponent(ToastComponent,{
      duration,
      horizontalPosition:'right',
      verticalPosition:'top',
      data:{
        message,
        title,
        type:TOAST_TYPES.Notify
      }
    })
  }
}
 
