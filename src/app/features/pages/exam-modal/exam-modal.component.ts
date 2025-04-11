import { Component, inject, input, InputSignal, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CheckQuestionInterface } from '../../interfaces/Questions/check-question-interface';
import { Question } from '../../interfaces/Questions/iquestions-on-exam-res';
import { QuestionService } from '../../services/Questions/question.service';

@Component({
  selector: 'app-exam-modal',
  imports: [CarouselModule],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss'
})
export class ExamModalComponent implements OnInit, OnDestroy {
  private readonly _QuestionService = inject(QuestionService);

  e_id: InputSignal<string> = input('');
  disabled: WritableSignal<boolean> = signal(true);
  questionsOnExam !: Question[];
  index: number = 0;
  answers : CheckQuestionInterface[] = [];
  minutes !:number;
  seconds :number = 0;
  allQuestionsOnExamID !: Subscription;

  ngOnInit(): void {
    this.startExam(this.e_id());
    
    let intervalId = setInterval(() => {
      if(this.seconds === 0){
        this.minutes = this.minutes -1;
        this.seconds = 60;
      }else{
        this.seconds = this.seconds - 1;
      }
      if(this.minutes === 0) clearInterval(intervalId)
  }, 1000)

  }

  startExam(e_id: string) {
    this.allQuestionsOnExamID = this._QuestionService.getAllQuestionsOnExam(e_id).subscribe({
      next: (res) => {
        this.questionsOnExam = res.questions;
        this.minutes = res.questions[0].exam.duration;
      }
    })
  }

  selectAnswer(q_id: string, key: string) {
    let index = this.answers.findIndex((ans) => ans.questionId === q_id);
    if (index == -1) {
      this.answers.push({ questionId: q_id, correct: key });
      localStorage.setItem('answers' , JSON.stringify(this.answers));
      this.disabled.update( (value)=> value = false );
    } else {
      this.answers[index].correct = key;
      localStorage.setItem('answers' , JSON.stringify(this.answers));
      this.disabled.update( (value)=> value = false );
    }
  }

  isSelected(q_id:string , key: string): boolean {
    return this.answers.some(answer => answer.questionId === q_id && answer.correct === key);
  }

  nextQuestion() {
    if (this.index < this.questionsOnExam.length) {
      this.index++;
      this.disabled.update( (value)=> value = true );
    }
  }
  previousQuestion() {
    if (this.index > 0) {
      this.index--;
    }
  }

  ngOnDestroy(): void {
    this.allQuestionsOnExamID?.unsubscribe();
    localStorage.clear()
  }

}
