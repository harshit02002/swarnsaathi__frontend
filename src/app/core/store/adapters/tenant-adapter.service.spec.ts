import {TestBed} from '@angular/core/testing';

import {TenantAdapter} from './tenant-adapter.service';

describe('TenantAdapterService', () => {
  let service: TenantAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
