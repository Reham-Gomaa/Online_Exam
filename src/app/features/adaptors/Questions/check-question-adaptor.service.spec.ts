import { TestBed } from '@angular/core/testing';

import { CheckQuestionAdaptorService } from './check-question-adaptor.service';

describe('CheckQuestionAdaptorService', () => {
  let service: CheckQuestionAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckQuestionAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
