import {Injectable} from '@angular/core';
import {IAdapter} from '@core/api/adapters/i-adapter';

import {Tenant} from '../models';

@Injectable()
export class TenantAdapter implements IAdapter<Tenant> {
  adaptToModel(resp: any): Tenant {
    const tenant: Tenant = new Tenant();
    if (resp) {
      tenant.id = resp.id;
      tenant.name = resp.name;
      tenant.key = resp.key;
      tenant.status = resp.status;
      tenant.address = resp.address;
      tenant.city = resp.city;
      tenant.state = resp.state;
      tenant.country = resp.country;
      tenant.zip = resp.zip;
    }
    return tenant;
  }
  adaptFromModel(data: Tenant): any {
    return {
      id: data.id,
      name: data.name,
      key: data.key,
      status: data.status,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      zip: data.zip,
    };
  }
}
