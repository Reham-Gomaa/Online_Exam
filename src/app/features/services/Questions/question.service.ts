import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { QuestionApi } from '../../base/Questions/questions.abstract';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuestionEndpoint } from '../../enums/Question/question.endpoints';
import { IQuestionsOnExamAdaptorRes } from '../../interfaces/Questions/iquestions-on-exam-res';
import { QuestionOnExamAdaptorService } from '../../adaptors/Questions/question-on-exam-adaptor.service';
import { Base_Url } from '../../../../../projects/auth-api/src/public-api';
import { CheckQuestionInterface, ScoreAdaptorRes } from '../../interfaces/Questions/check-question-interface';
import { CheckQuestionAdaptorService } from '../../adaptors/Questions/check-question-adaptor.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements QuestionApi {
  constructor() { }

  closeModal :WritableSignal<boolean> = signal(false);

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Base_Url = inject(Base_Url);
  private readonly _QuestionOnExamAdaptorService = inject(QuestionOnExamAdaptorService);
  private readonly _CheckQuestionAdaptorService = inject(CheckQuestionAdaptorService);

  getAllQuestionsOnExam(e_id:string):Observable<IQuestionsOnExamAdaptorRes> {
    return this._HttpClient.get( this._Base_Url + QuestionEndpoint.GET_ALL_QUESTIONS_ON_EXAM + e_id ).pipe(
      map( (res:any)=> this._QuestionOnExamAdaptorService.adapt(res) )
    )
  }

  checkQuestions(data:CheckQuestionInterface):Observable<ScoreAdaptorRes>{
    return this._HttpClient.post( this._Base_Url + QuestionEndpoint.CHECK_QUESTIONS , data ).pipe(
      map( (res:any)=> this._CheckQuestionAdaptorService.adapt(res) )
    )
  }

  getUserHistory():Observable<any>{
    return this._HttpClient.get( this._Base_Url + QuestionEndpoint.GET_USER_HISTORY )
  }

}
