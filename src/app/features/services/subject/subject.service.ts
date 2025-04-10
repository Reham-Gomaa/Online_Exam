import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Base_Url } from 'auth-api';
import { map, Observable } from 'rxjs';
import { AllSubjectAdaptorService } from '../../adaptors/subject/all-subject-adaptor.service';
import { SingleSubjectAdaptorService } from '../../adaptors/subject/single-subject-adaptor.service';
import { SubjectApi } from '../../base/subject/subject.abstract';
import { SubjectsEndpoint } from '../../enums/Subjects/subjects.endpoints';
import { IAllSubjectAdaptorRes } from '../../interfaces/subject/iall-subject-res';
import { ISingleSubjectAdaptorRes } from '../../interfaces/subject/isingle-subject-res';

@Injectable({
  providedIn: 'root'
})
export class SubjectService implements SubjectApi{
  private readonly _HttpClient = inject(HttpClient);
  private readonly _AllSubjectAdaptorService = inject(AllSubjectAdaptorService);
  private readonly _SingleSubjectAdaptorService = inject(SingleSubjectAdaptorService);
  private readonly _Base_Url = inject(Base_Url)

  constructor() { }

  getAllSubjects(): Observable<IAllSubjectAdaptorRes> {
    return this._HttpClient.get( this._Base_Url+SubjectsEndpoint.SUBJECTS ).pipe(
      map( (res:any)=> this._AllSubjectAdaptorService.adapt(res) )
    )
  }

  getSingleSubject(s_id:string):Observable<ISingleSubjectAdaptorRes>{
    return this._HttpClient.get( this._Base_Url + SubjectsEndpoint.GET_SINGLE_SUBJECT + s_id ).pipe(
      map( (res:any)=> this._SingleSubjectAdaptorService.adapt(res) )
    )
  }
}
