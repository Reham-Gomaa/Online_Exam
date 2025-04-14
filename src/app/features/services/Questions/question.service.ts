import { inject, Injectable } from '@angular/core';
import { QuestionApi } from '../../base/Questions/questions.abstract';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Base_Url } from 'auth-api';
import { QuestionEndpoint } from '../../enums/Question/question.endpoints';
import { IQuestionsOnExamAdaptorRes } from '../../interfaces/Questions/iquestions-on-exam-res';
import { QuestionOnExamAdaptorService } from '../../adaptors/Questions/question-on-exam-adaptor.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements QuestionApi {
  constructor() { }

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Base_Url = inject(Base_Url);
  private readonly _QuestionOnExamAdaptorService = inject(QuestionOnExamAdaptorService);

  getAllQuestionsOnExam(e_id:string):Observable<IQuestionsOnExamAdaptorRes> {
    return this._HttpClient.get( this._Base_Url + QuestionEndpoint.GET_ALL_QUESTIONS_ON_EXAM + e_id ).pipe(
      map( (res:any)=> this._QuestionOnExamAdaptorService.adapt(res) )
    )
  }

  checkQuestions(data:any):Observable<any>{
    return this._HttpClient.post( this._Base_Url + QuestionEndpoint.CHECK_QUESTIONS , data );
  }

}
