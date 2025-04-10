import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { ISingleSubjectAdaptorRes, ISingleSubjectRes } from '../../interfaces/subject/isingle-subject-res';

@Injectable({
  providedIn: 'root'
})
export class SingleSubjectAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: ISingleSubjectRes):ISingleSubjectAdaptorRes {
    return { category: data.category }
  }
}
