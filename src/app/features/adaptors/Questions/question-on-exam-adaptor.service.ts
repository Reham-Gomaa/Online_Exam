import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { IQuestionsOnExamAdaptorRes, IQuestionsOnExamRes } from '../../interfaces/Questions/iquestions-on-exam-res';

@Injectable({
  providedIn: 'root'
})
export class QuestionOnExamAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: IQuestionsOnExamRes): IQuestionsOnExamAdaptorRes {
    return { questions  : data.questions }
  }
}
