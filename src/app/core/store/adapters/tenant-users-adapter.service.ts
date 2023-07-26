import {Injectable} from '@angular/core';
import {IAdapter} from '@core/api/adapters/i-adapter';
import {TenantUser} from '../models';

@Injectable({
  providedIn: 'root',
})
export class TenantUsersAdapterService implements IAdapter<TenantUser> {
  constructor() {}
  adaptToModel(resp: any): TenantUser {
    const tenantUser: TenantUser = new TenantUser();
    if (resp) {
      tenantUser.id = resp.id;
      tenantUser.name = resp.name;
      tenantUser.fullName = resp.fullName;
      tenantUser.username = resp.username;
      tenantUser.phone = resp.phone;
    }
    return tenantUser;
  }

  adaptFromModel(data: TenantUser): any {
    return {...data} as TenantUser;
  }
}
