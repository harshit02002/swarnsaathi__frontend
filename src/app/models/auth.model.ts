import { RoleType } from "@core/enums";

export class SignupRequest {
  email: string;
  password: string;
  title: string;
  role: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

export class SignupResponse {
  message: string;
}

export class RefreshTokenRequest {
  refreshToken: string;
}
export class RefreshTokenResponse {
  jwtToken: string;
  refreshToken: string;
}
export class User {
  firstName: string;
  lastName: string;
  role: RoleType;
}

export class LoginRequest {
  email: string;
  password: string;
}

export class LoginResponse extends User {
    jwtToken: string;
    refreshToken: string;    
}

export class VolunteerDetailsRequest {
  hourlyCharge:number;
  city:string;
  age:number;
  gender:string;
}

export class VolunteerDetailsResponse extends VolunteerDetailsRequest {
  accountId:string;  
  account?:SignupRequest;
}

export class ElderlyDetailsRequest {
  address:string;
  city:string;
  age:number;
  gender:string;
}

export class ElderlyDetailsResponse extends ElderlyDetailsRequest {
  accountId:string;  
  account?:SignupRequest;
}

export class FindVolunteerRequest{
  days:number;
  hours:number;
  budget:number;

}

export class FindVolunteerResponse extends VolunteerDetailsResponse{
  id:string;
}

export class VolunteerBookingResponse{
  startDate:Date;
  endDate:Date;
  status:string;
  hourlyCharge:number;
  hours:number;
  elderly: ElderlyDetailsResponse;
}

export class ElderlyBookingResponse{
  startDate:Date;
  endDate:Date;
  status:string;
  hourlyCharge:number;
  hours:number;
  volunteer:VolunteerDetailsResponse;
}

export class BookingRequestRequest{
  days:number;
  hours:number;
  volunteerId:string;
}

export class BookingRequestResponse{
  message:string;
}