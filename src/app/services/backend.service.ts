import {Injectable} from '@angular/core';
import {AddElderlyDetailCommand, AddVolunteerDetailCommand, BookingRequestCommand, FindVolunteerCommand, GetElderlyBookingsCommand, GetElderlyDetailsCommand, GetVolunteerBookingsCommand, GetVolunteerDetailsCommand, LoginCommand, RefreshTokenCommand, SignupCommand} from '../commands/backend.command';
import {ApiService} from '../core/api/api.service';
import {AnyAdapter} from '../core/api/adapters/any-adapter.service';
import {BookingRequestRequest, ElderlyDetailsRequest, FindVolunteerRequest, LoginRequest, SignupRequest, VolunteerDetailsRequest} from '../models/auth.model';
import {Observable, of, tap} from 'rxjs';
import {UserSessionStoreService} from '@core/store/user-session-store.service';
import { AuthTokenSkipHeader } from '../const';
import { HttpHeaders } from '@angular/common/http';
import { RoleType } from '@core/enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private readonly authHeaders = new HttpHeaders().set(AuthTokenSkipHeader, '');
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    private readonly store: UserSessionStoreService,
    private readonly router: Router,
  ) {}

  signUp(data: SignupRequest) {
    const command = new SignupCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      data,
      observe: 'body',
      headers: this.authHeaders,
    };
    return command.execute();
  }
  // sonarignore:start
  public refreshToken(): Observable<any> {
    // sonarignore:end
    const refreshToken = this.store.getRefreshToken();
    if (!refreshToken) {
      return of(false);
    }
    // sonarignore:start
    const command = new RefreshTokenCommand(this.apiService, this.anyAdapter);
    // sonarignore:end
    command.parameters = {
      data: {
        refreshToken,
      },
    };
    return command.execute().pipe(
      tap({
        next: response => {
          if (response.jwtToken && response.refreshToken) {
            this.store.clearAll();
            this.store.saveAccessToken(response.jwtToken);
            this.store.saveRefreshToken(response.refreshToken);
          } else {
            this.logout();
          }
        },
        error: err => {
          console.log('error');
        },
      }),
    );
  }
  logout() {
    this.store.removeAccessToken();
    this.store.removeRefreshToken();
  }
  login(loginRequest:LoginRequest){
    const command = new LoginCommand(this.apiService,this.anyAdapter);
    command.parameters={
      data:loginRequest,
      observe:'body',
      headers:this.authHeaders,
    }
    return command.execute().pipe(
      tap({
        next: response => {
          if (response.jwtToken && response.refreshToken) {
            this.store.clearAll();
            this.store.saveAccessToken(response.jwtToken);
            this.store.saveRefreshToken(response.refreshToken);
            if (response.role === RoleType.Elderly){
              this.router.navigate(['elderly'])
            }
            else if(response.role === RoleType.Volunteer){
              this.router.navigate(['volunteer'])
            }
            
          } 
          else {
            this.logout();
          }
        },
        error: err => {
          console.log('error');
        },
      }),
    );
  }
  addElderlyDetails(data: ElderlyDetailsRequest) {
    const command = new AddElderlyDetailCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      data,
      observe: 'body',
    };
    return command.execute();
  }

  addVolunteerDetails(data: VolunteerDetailsRequest) {
    const command = new AddVolunteerDetailCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      data,
      observe: 'body',
    };
    return command.execute();
  }

  getVolunteerDetails() {
    const command = new GetVolunteerDetailsCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      observe: 'body',
    };
    return command.execute();
  }

  getElderlyDetails() {
    const command = new GetElderlyDetailsCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      observe: 'body',
    };
    return command.execute();
  }

  findVolunteer(data: FindVolunteerRequest) {
    const command = new FindVolunteerCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      data,
      observe: 'body',
    };
    return command.execute();
  }

  bookingRequest(data:BookingRequestRequest) {
    const command = new BookingRequestCommand(this.apiService, this.anyAdapter);
    command.parameters = {
      data,
      observe: 'body',
    };
    return command.execute();
  }

  getVolunteerBooking() {
    const command = new GetVolunteerBookingsCommand(this.apiService, this.anyAdapter);
    command.parameters = {
     
      observe: 'body',
    };
    return command.execute();
  }

  getElderlyBooking() {
    const command = new GetElderlyBookingsCommand(this.apiService, this.anyAdapter);
    command.parameters = {
   
      observe: 'body',
    };
    return command.execute();
  }

}

