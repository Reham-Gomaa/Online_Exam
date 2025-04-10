import { TestBed } from '@angular/core/testing';

import { QuestionOnExamAdaptorService } from './question-on-exam-adaptor.service';

describe('QuestionOnExamAdaptorService', () => {
  let service: QuestionOnExamAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionOnExamAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
