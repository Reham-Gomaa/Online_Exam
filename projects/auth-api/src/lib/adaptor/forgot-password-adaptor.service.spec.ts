import { TestBed } from '@angular/core/testing';

import { ForgotPasswordAdaptorService } from './forgot-password-adaptor.service';

describe('ForgotPasswordAdaptorService', () => {
  let service: ForgotPasswordAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPasswordAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
