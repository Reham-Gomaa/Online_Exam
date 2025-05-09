import { animate, state, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, effect, EffectRef, EventEmitter, inject, input, InputSignal, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Answer, ScoreAdaptorRes } from '../../interfaces/Questions/check-question-interface';
import { Question } from '../../interfaces/Questions/iquestions-on-exam-res';
import { QuestionService } from '../../services/Questions/question.service';

@Component({
  selector: 'app-exam-modal',
  imports: [BaseChartDirective],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss',
  animations:[
    trigger('next' , [
      state('*' , style({
        opacity:'1',
        transform:'translateX(0px)'
      })),
      transition((fromState, toState) => toState.startsWith('next'), [
        style({
          opacity:'0',
          transform:'translateX(100px)'
        }),
        animate(300)
      ]),
      transition((fromState, toState) => toState.startsWith('back') , [
        style({
          opacity:'0',
          transform:'translateX(-100px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class ExamModalComponent implements OnDestroy  {
  private readonly _QuestionService = inject(QuestionService);
  private readonly platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  e_id: InputSignal<string> = input('');
  examStart: InputSignal<boolean> = input(false); 
  private startExamEffect !:EffectRef ;
  showScore: WritableSignal<boolean> = signal(false);
  score !: ScoreAdaptorRes;
  questionsOnExam !: Question[];
  index: number = 0;
  startIndex: number = 0;
  answers: Answer[] = [];
  duration !: number;
  time !: number;
  minutes !: number;
  seconds: number = 0;
  allQuestionsOnExamID !: Subscription;
  checkQuestionsID !: Subscription;
  direction : 'next' | 'back' = 'next';
  @Output() closed = new EventEmitter<void>();
  loading :boolean = false;

  doughnutChartData: ChartData<'doughnut'> | undefined;
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: true
  };

  constructor() {
    Chart.register(...registerables);
     this.startExamEffect = effect( ()=> {
      if( this.examStart() == true && this.e_id() ){
        this.startExam();
      }
    } )
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.startExam();
  // }
  
  startExam() {
    this.loading = true;
    this.allQuestionsOnExamID = this._QuestionService.getAllQuestionsOnExam(this.e_id()).subscribe({
      next: (res) => {
        this.loading = false;
        this.questionsOnExam = res.questions;
        this.duration = res.questions[0].exam.duration;
        this.minutes = res.questions[0].exam.duration;
        this.setInterval();
      }
    })
  }

  setInterval(){
    let intervalId = setInterval(() => {
      if (this.seconds === 0) {
        this.minutes = this.minutes - 1;
        this.seconds = 59;
      } else {
        this.seconds = this.seconds - 1;
      }
      if (this.minutes === 0) {
        clearInterval(intervalId);
        this.submit();
      }
    }, 1000)
  }

  selectAnswer(q_id: string, key: string) {
    let index = this.answers.findIndex((ans) => ans.questionId === q_id);
    if (index == -1) {
      this.answers.push({ questionId: q_id, correct: key });
      sessionStorage.setItem('answers', JSON.stringify(this.answers));
    } else {
      this.answers[index].correct = key;
      sessionStorage.setItem('answers', JSON.stringify(this.answers));
    }
  }

  isSelected(q_id: string, key: string): boolean {
    return this.answers.some(answer => answer.questionId === q_id && answer.correct === key);
  }
  check(q_id: string): boolean {
    return this.answers.some(answer => answer.questionId === q_id);
  }

  answersMap(q_id: string): string {
    let index = this.answers.findIndex((q) => q.questionId == q_id);
    return this.answers[index].correct;
  }

  getQuestionState(): string {
    return `${this.direction}-${this.index}`;
  }

  nextQuestion() {
    if (this.index < this.questionsOnExam.length - 1) {
      this.index++;
      this.direction = 'next';
    } else {
      this.index = 0;
      this.submit();
      this.showScore.update((value) => value = true);
    }
  }
  previousQuestion() {
    if (this.index > 0) {
      this.index--;
      this.direction = 'back';
    }
  }

  submit() {
    this.loading = true;
    this.time = this.duration - this.minutes;
    this.checkQuestionsID = this._QuestionService.checkQuestions({ answers: this.answers, time: this.time }).subscribe({
      next: (res) => {
        this.loading = false;
        this.score = res;
        this.initChart();
      }
    })
  }

  showResults() {
    this.showScore.update((value) => value = false)
  }

  initChart() {
    if (!this.score) return;
    this.doughnutChartData = {
      datasets: [{
        data: [this.score?.correct, this.score?.wrong],
        backgroundColor: ['rgb(2, 54, 156)', 'rgb(204, 16, 16)'],
        hoverOffset: 4
      }],
    };
    this.doughnutChartType = 'doughnut';
  }

  close(){
    this._QuestionService.closeModal.set(true);
    // this.score = {} as ScoreAdaptorRes;
    // this.showScore.set(false);
    // this.answers = [];
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.startExamEffect?.destroy();
    this.allQuestionsOnExamID?.unsubscribe();
    this.checkQuestionsID?.unsubscribe();
    sessionStorage.removeItem('answers');
  }

}
