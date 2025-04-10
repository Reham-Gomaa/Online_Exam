import { Observable } from "rxjs";
import { IAllSubjectAdaptorRes, Subject } from "../../interfaces/subject/iall-subject-res";
import { ISingleSubjectAdaptorRes } from "../../interfaces/subject/isingle-subject-res";

export abstract class SubjectApi {
    
    abstract getAllSubjects():Observable<IAllSubjectAdaptorRes>;
    abstract getSingleSubject(s_id:string):Observable<ISingleSubjectAdaptorRes>
}