import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  startDate:string;
  endDate:string;
  status:string;

}
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'age', 'startDate','endDate','status','hourlyCharge', 'totalCharge'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  activeSubmit=false;
  constructor(
    private readonly backendService: BackendService,
    private readonly toastrService: ToastrService,
    
  ) {this.dataSource = new MatTableDataSource();}
    ngOnInit(): void {
      this.backendService
      .getVolunteerBooking()
      .pipe(take(1))
      .subscribe({
        next: res => {
          // this.form.reset();
          // this.toastrService.success("","Found Volunteers",DEFAULT_TOAST_TIME)
          // this.activeSubmit=false;
          this.dataSource.data=res.map((i)=>{
            var time_difference = new Date(i.endDate).getTime() - new Date(i.startDate).getTime();  
         //calculate days difference by dividing total milliseconds in a day  
         var result = time_difference / (1000 * 60 * 60 * 24);
            return {
              age:i.elderly.age,
              name:`${i.elderly.account?.firstName} ${i.elderly.account?.lastName}`,
              hourlyCharge:i.hourlyCharge,
              totalCharge:i.hourlyCharge*result*i.hours,
              endDate:new Date(i.endDate).toDateString(),
              startDate:new Date(i.startDate).toDateString(),
              status:i.status
            }
          })
          this.dataSource._updateChangeSubscription()
        },
        error: res=>{
          // this.activeSubmit=false;
          this.toastrService.error("","Cannot Find Bookings",DEFAULT_TOAST_TIME)
        }
      });
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
 
}

