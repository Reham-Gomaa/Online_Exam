import { TestBed } from '@angular/core/testing';

import { LogoutAdaptorService } from './logout-adaptor.service';

describe('LogoutAdaptorService', () => {
  let service: LogoutAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
