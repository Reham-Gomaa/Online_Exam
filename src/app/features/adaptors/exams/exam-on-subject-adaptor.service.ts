import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { IExamOnSubjectAdaptorRes, IExamOnSubjectRes } from '../../interfaces/Exams/iexam-on-subject-res';

@Injectable({
  providedIn: 'root'
})
export class ExamOnSubjectAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: IExamOnSubjectRes):IExamOnSubjectAdaptorRes {
    return { exams : data.exams }
  }
}
