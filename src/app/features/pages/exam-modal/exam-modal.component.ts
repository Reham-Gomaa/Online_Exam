import { Component, inject, input, InputSignal, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { QuestionService } from '../../services/Questions/question.service';
import { Answer, Question } from '../../interfaces/Questions/iquestions-on-exam-res';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-exam-modal',
  imports: [ CarouselModule ],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss'
})
export class ExamModalComponent implements OnInit , OnDestroy{
  private readonly _QuestionService = inject(QuestionService);

  e_id :InputSignal<string> = input('');
  disabled :WritableSignal<boolean> = signal(true);
  questionsOnExam !: Question[];
  index :number = 0;
  //answers !: Answer[][];
  questionOnExamID !: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.startExam(this.e_id());
  }

  startExam(e_id:string){
    this._QuestionService.getAllQuestionsOnExam(e_id).subscribe({
      next: (res)=>{
        this.questionsOnExam = res.questions;
        //this.answers = res.questions.map( (e)=> e.answers )
      }
    })
  }

  nextQuestion(){
    if(this.index < this.questionsOnExam.length){
      this.index++;
    }
  }
  previousQuestion(){
    if(this.index > 0){
      this.index--;
    }
  }

  ngOnDestroy(): void {
    this.questionOnExamID?.unsubscribe();
  }

}
