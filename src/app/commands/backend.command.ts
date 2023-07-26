import { IAdapter } from "../core/api/adapters/i-adapter";
import { ApiService } from "../core/api/api.service";
import { GetAPICommand, PostAPICommand } from "../core/api/commands";
import { BookingRequestRequest, BookingRequestResponse, ElderlyBookingResponse, ElderlyDetailsRequest, ElderlyDetailsResponse, FindVolunteerRequest, FindVolunteerResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse, SignupRequest, SignupResponse, VolunteerBookingResponse, VolunteerDetailsRequest, VolunteerDetailsResponse } from "../models/auth.model";
//import {environment} from '@env/environment';

export class SignupCommand extends PostAPICommand<SignupResponse,SignupRequest> {
    constructor(apiService: ApiService, adapter: IAdapter<SignupResponse,SignupRequest>) {
      super(apiService, adapter, `http://localhost:4000/accounts/register`);
    }
}

export class AddElderlyDetailCommand extends PostAPICommand<ElderlyDetailsResponse,ElderlyDetailsRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<ElderlyDetailsResponse,ElderlyDetailsRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/elderly`);
  }
}

export class AddVolunteerDetailCommand extends PostAPICommand<VolunteerDetailsResponse,VolunteerDetailsRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<VolunteerDetailsResponse,VolunteerDetailsRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/volunteer`);
  }
}

export class FindVolunteerCommand extends PostAPICommand<FindVolunteerResponse[],FindVolunteerRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<FindVolunteerResponse[],FindVolunteerRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/find-volunteer`);
  }
}

export class BookingRequestCommand extends PostAPICommand<BookingRequestResponse[],BookingRequestRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<BookingRequestResponse[],BookingRequestRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/volunteer-bookings`);
  }
}

export class RefreshTokenCommand extends PostAPICommand<RefreshTokenResponse,RefreshTokenRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<RefreshTokenResponse,RefreshTokenRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/token-refresh`);
  }
}

export class LoginCommand extends PostAPICommand<LoginResponse,LoginRequest> {
  constructor(apiService: ApiService, adapter: IAdapter<LoginResponse,LoginRequest>) {
    super(apiService, adapter, `http://localhost:4000/accounts/authenticate`);
  }
}

export class GetElderlyDetailsCommand extends GetAPICommand<ElderlyDetailsResponse> {
  constructor(apiService: ApiService, adapter: IAdapter<ElderlyDetailsResponse>) {
    super(apiService, adapter, `http://localhost:4000/accounts/elderly`);
  }
}

export class GetVolunteerDetailsCommand extends GetAPICommand<VolunteerDetailsResponse> {
  constructor(apiService: ApiService, adapter: IAdapter<VolunteerDetailsResponse>) {
    super(apiService, adapter, `http://localhost:4000/accounts/volunteer`);
  }
}

export class GetVolunteerBookingsCommand extends GetAPICommand<VolunteerBookingResponse[]> {
  constructor(apiService: ApiService, adapter: IAdapter<VolunteerBookingResponse[]>) {
    super(apiService, adapter, `http://localhost:4000/accounts/volunteer-bookings`);
  }
}

export class GetElderlyBookingsCommand extends GetAPICommand<ElderlyBookingResponse[]> {
  constructor(apiService: ApiService, adapter: IAdapter<ElderlyBookingResponse[]>) {
    super(apiService, adapter, `http://localhost:4000/accounts/elderly-bookings`);
  }
}

