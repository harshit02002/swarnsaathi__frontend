import {NameId} from '@core/models';

export class TenantUser extends NameId {
  fullName: string;
  username: string;
  email: string;
  designation?: string;
  phone?: string;
  userTenantId?: string;

  constructor(data?: Partial<TenantUser>) {
    super(data);
    this.fullName = data?.fullName ?? '';
    this.username = data?.username ?? '';
    this.email = data?.email ?? '';
    this.designation = data?.designation;
    this.phone = data?.phone;
    this.userTenantId = data?.userTenantId;
  }
}
