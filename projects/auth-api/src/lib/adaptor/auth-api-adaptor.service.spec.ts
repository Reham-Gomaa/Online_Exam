import { TestBed } from '@angular/core/testing';

import { AuthApiAdaptorService } from './auth-api-adaptor.service';

describe('AuthApiAdaptorService', () => {
  let service: AuthApiAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
