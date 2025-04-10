import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Base_Url } from 'auth-api';
import { map, Observable } from 'rxjs';
import { ExamOnSubjectAdaptorService } from '../../adaptors/exams/exam-on-subject-adaptor.service';
import { ExamsApi } from '../../base/Exams/exams.abstract';
import { ExamsEndpoints } from '../../enums/Exams/exams.endpoints';
import { IExamOnSubjectAdaptorRes } from '../../interfaces/Exams/iexam-on-subject-res';

@Injectable({
  providedIn: 'root'
})
export class ExamsService implements ExamsApi{
  constructor() { }
  
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Base_Url = inject(Base_Url);
  private readonly _ExamOnSubjectAdaptorService = inject(ExamOnSubjectAdaptorService);


  getAllExamsOnSubject(s_id:string):Observable<IExamOnSubjectAdaptorRes>{
    return this._HttpClient.get( this._Base_Url +ExamsEndpoints.GET_ALL_EXAMS_ON_SUBJECT + s_id ).pipe(
      map( (res:any)=> this._ExamOnSubjectAdaptorService.adapt(res) )
    )
  }

}
