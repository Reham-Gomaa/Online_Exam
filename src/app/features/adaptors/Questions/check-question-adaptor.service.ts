import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { CheckQuestionRes, ScoreAdaptorRes } from '../../interfaces/Questions/check-question-interface';

@Injectable({
  providedIn: 'root'
})
export class CheckQuestionAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: CheckQuestionRes):ScoreAdaptorRes {
    return {
      correct: data.correct,
      wrong: data.wrong,
      total: data.total,
       WrongQuestions: data.WrongQuestions
    }
  }
}
