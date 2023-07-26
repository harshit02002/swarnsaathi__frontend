import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ElderlyComponent } from './elderly.component';
import { FindVolunteerComponent } from './find-volunteer/find-volunteer.component';
import { ProfileComponent } from './profile/profile.component';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { ToastrService } from '../services/toastr.service';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {
    path:'',
    component:ElderlyComponent,
    children:[{
      path:'',
      component:ProfileComponent
     },
     {
      path:'find-volunteer',
      component:FindVolunteerComponent
     },
     {
      path:'my-bookings',
      component:BookingsComponent
     }
    ],
     
  },
];



@NgModule({
  declarations: [
    ElderlyComponent,
    FindVolunteerComponent,
    ProfileComponent,
    BookingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ElderlyModule {
  activeSubmit=false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backendService: BackendService,
    private readonly toastrService: ToastrService,
  ) {}
  form = this.formBuilder.group({
    gender: ['', [Validators.required]],
    age: ['', [Validators.required]],
    hourlycharge: ['', [Validators.required]],
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
      hourlyCharge: this.f['hourlycharge'].value ?? '',
      gender: this.f['gender'].value ?? '',
      age: this.f['age'].value ?? '',
    };
  }
  onSelectGender(gender: any) {
    this.f['gender'].setValue(gender.value);
  }

 }
