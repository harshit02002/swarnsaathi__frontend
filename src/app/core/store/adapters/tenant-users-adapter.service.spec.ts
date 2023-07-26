import {TestBed} from '@angular/core/testing';

import {TenantUsersAdapterService} from './tenant-users-adapter.service';

describe('TenantUsersAdapterService', () => {
  let service: TenantUsersAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantUsersAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
