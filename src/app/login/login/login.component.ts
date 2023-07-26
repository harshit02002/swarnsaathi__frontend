import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {take} from 'rxjs';
import {BackendService} from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  activeSubmit = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) {}
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }
  submit() {
    if (!this.form.valid) {
      return;
    }
    this.activeSubmit = true;
    const data = {
      email: this.f['email'].value ?? '',
      password: this.f['password'].value ?? '',
    };
    this.backendService
      .login(data)
      .pipe(take(1))
      .subscribe({
        next: res => {
          console.log('Login successful');
          this.activeSubmit = false;
        },
        error: res => {
          console.log('Login unsuccessful');
          this.activeSubmit = false;
        },
      });
  }
  goToSignup(){
    this.router.navigate(['signup']);
  }
}

