import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DEFAULT_TOAST_TIME } from 'src/app/const';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
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
    city:['', [Validators.required]],
  });
  ngOnInit(): void {
      this.backendService.getVolunteerDetails().pipe(take(1)).subscribe({
        next: res => {
          if(res.gender){
            this.f['hourlycharge'].setValue(`${res.hourlyCharge}`)
            this.f['age'].setValue(`${res.age}`)
            this.f['gender'].setValue(res.gender)
            this.f['city'].setValue(res.city)
            this.activeSubmit=true;
          }
         
          // this.form.reset();
          //this.toastrService.success("","Details Saved",DEFAULT_TOAST_TIME)
          //this.activeSubmit=false;
        },
        error: res=>{
          this.activeSubmit=false;
          //this.toastrService.error("","Details not saved",DEFAULT_TOAST_TIME)
        }
      });
  }

  get f() {
    return this.form.controls;
  }
  
  onSelectCity(city: any) {
    this.f['city'].setValue(city.value);
  }
  submit() {
    if (!this.form.valid) {
      return;
    }
    this.activeSubmit=true;
    const data = {
      hourlyCharge: Number(this.f['hourlycharge'].value) ?? '',
      gender: this.f['gender'].value ?? '',
      age: Number(this.f['age'].value) ?? '',
      city: this.f['city'].value ?? '',

    };
    this.backendService
      .addVolunteerDetails(data)
      .pipe(take(1))
      .subscribe({
        next: res => {
          // this.form.reset();
          this.toastrService.success("","Details Saved",DEFAULT_TOAST_TIME)
          //this.activeSubmit=false;
        },
        error: res=>{
          this.activeSubmit=false;
          this.toastrService.error("","Details not saved",DEFAULT_TOAST_TIME)
        }
      });
  }
  
  onSelectGender(gender: any) {
    this.f['gender'].setValue(gender.value);
  }


}
