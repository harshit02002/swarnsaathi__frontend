import {TestBed} from '@angular/core/testing';

import {SystemStoreFacadeService} from './system-store-facade.service';

describe('SystemStoreFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemStoreFacadeService = TestBed.inject(
      SystemStoreFacadeService,
    );
    expect(service).toBeTruthy();
  });
});
