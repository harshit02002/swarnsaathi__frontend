import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupGuardService } from '@core/guards/singup.guard.service';
 
  const loadLoginModule = () =>
  import('./login/login.module').then(m => m.LoginModule);
  const loadElderlyModule = () =>
  import('./elderly/elderly.module').then(m => m.ElderlyModule);
  const loadVolunteerModule = () =>
  import('./volunteer/volunteer.module').then(m => m.VolunteerModule);
const routes: Routes = [
  {
    path:'',
    loadChildren:loadLoginModule,
  },
  {
    path:'elderly',
    canActivate:[SignupGuardService],
    loadChildren:loadElderlyModule,
  },
  {
    path:'volunteer',
    canActivate:[SignupGuardService],
    loadChildren:loadVolunteerModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
