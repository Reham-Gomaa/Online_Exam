import { Observable } from "rxjs";
import { IExamOnSubjectAdaptorRes } from "../../interfaces/Exams/iexam-on-subject-res";

export abstract class ExamsApi {
    
    abstract getAllExamsOnSubject (s_id:string):Observable<IExamOnSubjectAdaptorRes>;
}