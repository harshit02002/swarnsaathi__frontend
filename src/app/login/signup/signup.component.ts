import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {take} from 'rxjs';
import { DEFAULT_TOAST_TIME } from 'src/app/const';
import {BackendService} from 'src/app/services/backend.service';
import { ToastrService } from 'src/app/services/toastr.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  activeSubmit=false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backendService: BackendService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
  ) {}
  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    acceptTerms: [false, [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }
  submit() {
    if (!this.form.valid) {
      return;
    }
    this.activeSubmit=true;
    const data = {
      email: this.f['email'].value ?? '',
      firstName: this.f['firstname'].value ?? '',
      lastName: this.f['lastname'].value ?? '',
      password: this.f['password'].value ?? '',
      role: this.f['role'].value ?? '',
      title: this.f['title'].value ?? '',
      acceptTerms: this.f['acceptTerms'].value ?? false,
    };
    this.backendService
      .signUp(data)
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.form.reset();
          this.toastrService.success("","Signup Successful, Please check your Email",DEFAULT_TOAST_TIME)
          this.activeSubmit=false;
        },
        error: res=>{
          this.activeSubmit=false;
          this.toastrService.error("","Signup Unsuccessful",DEFAULT_TOAST_TIME)
        }
      });
  }
  onSelectRole(role: any) {
    this.f['role'].setValue(role.value);
  }

  onSelectTitle(title: any) {
    this.f['title'].setValue(title.value);
  }

  acceptTerms(accept: any) {
    console.log(accept);
    this.f['acceptTerms'].setValue(accept);
  }
  goToLogin(){
    this.router.navigate(['login'])
  }
}



