import { Injectable } from '@angular/core';
import { IAdapt } from '../../interfaces/iadapt';
import { IAllSubjectAdaptorRes, IAllSubjectRes, Subject } from '../../interfaces/subject/iall-subject-res';

@Injectable({
  providedIn: 'root'
})
export class AllSubjectAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: IAllSubjectRes):IAllSubjectAdaptorRes {
    
      return { subjects : data.subjects }
    
    
  }
}
