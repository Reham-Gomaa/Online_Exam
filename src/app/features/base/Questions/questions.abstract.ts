import { Observable } from "rxjs";
import { IQuestionsOnExamAdaptorRes } from "../../interfaces/Questions/iquestions-on-exam-res";

export abstract class QuestionApi {

    abstract getAllQuestionsOnExam(e_id:string):Observable<IQuestionsOnExamAdaptorRes>;
    
}