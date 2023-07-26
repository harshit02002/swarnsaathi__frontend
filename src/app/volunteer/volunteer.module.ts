import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerComponent } from './volunteer.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {
    path:'',
    component:VolunteerComponent,
    children:[{
      path:'',
      component:ProfileComponent
     },
     {
      path:'bookings',
      component:BookingsComponent
     }
    ],
  },
];


@NgModule({
  declarations: [
    VolunteerComponent,
    ProfileComponent,
    BookingsComponent,
    
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class VolunteerModule { }
