import { TestBed } from '@angular/core/testing';

import { VerifyCodeAdaptorService } from './verify-code-adaptor.service';

describe('VerifyCodeAdaptorService', () => {
  let service: VerifyCodeAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyCodeAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
