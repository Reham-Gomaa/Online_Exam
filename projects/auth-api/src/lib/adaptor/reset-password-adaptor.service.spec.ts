import { TestBed } from '@angular/core/testing';

import { ResetPasswordAdaptorService } from './reset-password-adaptor.service';

describe('ResetPasswordAdaptorService', () => {
  let service: ResetPasswordAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
