import { Observable } from "rxjs";
import { IQuestionsOnExamAdaptorRes } from "../../interfaces/Questions/iquestions-on-exam-res";
import { CheckQuestionInterface, ScoreAdaptorRes } from "../../interfaces/Questions/check-question-interface";

export abstract class QuestionApi {

    abstract getAllQuestionsOnExam(e_id:string):Observable<IQuestionsOnExamAdaptorRes>;
    abstract checkQuestions(data:CheckQuestionInterface):Observable<ScoreAdaptorRes>
    
}