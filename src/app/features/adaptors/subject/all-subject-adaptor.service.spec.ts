import { TestBed } from '@angular/core/testing';

import { AllSubjectAdaptorService } from './all-subject-adaptor.service';

describe('AllSubjectAdaptorService', () => {
  let service: AllSubjectAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSubjectAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
