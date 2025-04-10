import { TestBed } from '@angular/core/testing';

import { SingleSubjectAdaptorService } from './single-subject-adaptor.service';

describe('SingleSubjectAdaptorService', () => {
  let service: SingleSubjectAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleSubjectAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
