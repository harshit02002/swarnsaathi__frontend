import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { DEFAULT_TOAST_TIME } from 'src/app/const';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  activeSubmit=false;
  form:FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backendService: BackendService,
    private readonly toastrService: ToastrService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      gender: ['', [Validators.required]],
      age: ['', [Validators.required,Validators.min(30)]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
      this.backendService.getElderlyDetails().pipe(take(1)).subscribe({
        next: res => {
          if(res.address){
            this.f['address'].setValue(res.address)
            this.f['age'].setValue(`${res.age}`)
            this.f['gender'].setValue(res.gender)
            this.f['address'].setValue(res.address)
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

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.activeSubmit=true;
    const data = {
      city: this.f['city'].value ?? '',
      gender: this.f['gender'].value ?? '',
      age: Number(this.f['age'].value) ?? 0,
      address: this.f['address'].value ?? '',
    };
    this.backendService
      .addElderlyDetails(data)
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
  onSelectCity(city: any) {
    this.f['city'].setValue(city.value);
  }
}
