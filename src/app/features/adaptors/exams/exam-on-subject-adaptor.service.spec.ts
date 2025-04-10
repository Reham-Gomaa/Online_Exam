import { TestBed } from '@angular/core/testing';

import { ExamOnSubjectAdaptorService } from './exam-on-subject-adaptor.service';

describe('ExamOnSubjectAdaptorService', () => {
  let service: ExamOnSubjectAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamOnSubjectAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
