import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { DEFAULT_TOAST_TIME } from 'src/app/const';
import { BackendService } from 'src/app/services/backend.service';
import { ToastrService } from 'src/app/services/toastr.service';

export interface UserData {
  name: string;
  age: number;
  hourlyCharge: number;
  totalCharge: number;
  volunteerId:string;
}

@Component({
  selector: 'app-find-volunteer',
  templateUrl: './find-volunteer.component.html',
  styleUrls: ['./find-volunteer.component.scss']
})
export class FindVolunteerComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'age', 'hourlyCharge', 'totalCharge','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  activeSubmit=false;
  activeSubmitVolunteer=false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backendService: BackendService,
    private readonly toastrService: ToastrService,
    
  ) {this.dataSource = new MatTableDataSource();}
  form = this.formBuilder.group({
    budget: ['', [Validators.required]],
    days: ['', [Validators.required]],
    hours: ['', [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  submit() {
    if (!this.form.valid) {
      return;
    }
    this.activeSubmit=true;
    const data = {
      budget: Number(this.f['budget'].value) ?? 0,
      days: Number(this.f['days'].value) ?? 0,
      hours: Number(this.f['hours'].value) ?? 0,
    };
    this.backendService
      .findVolunteer(data)
      .pipe(take(1))
      .subscribe({
        next: res => {
          // this.form.reset();
          this.toastrService.success("","Found Volunteers",DEFAULT_TOAST_TIME)
          this.activeSubmit=false;
          this.dataSource.data=res.map((i)=>{
            return {
              age:i.age,
              name:`${i.account?.firstName} ${i.account?.lastName}`,
              hourlyCharge:i.hourlyCharge,
              totalCharge:i.hourlyCharge*data.days*data.hours,
              volunteerId:i.id,
            }
          })
          this.dataSource._updateChangeSubscription()
        },
        error: res=>{
          this.activeSubmit=false;
          this.toastrService.error("","Cannot Find Volunteers",DEFAULT_TOAST_TIME)
        }
      });
  }
  selectVolunteer(id:string){
    this.activeSubmitVolunteer=true;
    //const selectedVolunteer = this.dataSource.data.find((i)=>i.volunteerId===id)
    this.backendService
    .bookingRequest({
      days: Number(this.f['days'].value) ?? 0,
      hours: Number(this.f['hours'].value) ?? 0,
      volunteerId : id,

    })
    .pipe(take(1))
    .subscribe({
      next: res => {
        // this.form.reset();
        this.toastrService.success("","Booking Request Successful",DEFAULT_TOAST_TIME)
        this.activeSubmitVolunteer=false;
      },
      error: res=>{
        this.toastrService.error("","Booking Request Unsuccessful",DEFAULT_TOAST_TIME)
        this.activeSubmitVolunteer=false;
      }
    });  
  }
}
