import { Component, ElementRef, inject, input, InputSignal, OnDestroy, OnInit, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Answer, ScoreAdaptorRes } from '../../interfaces/Questions/check-question-interface';
import { Question } from '../../interfaces/Questions/iquestions-on-exam-res';
import { QuestionService } from '../../services/Questions/question.service';
import { isPlatformBrowser } from '@angular/common';
Chart.register(...registerables);
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-exam-modal',
  imports: [ BaseChartDirective ],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss'
})
export class ExamModalComponent implements OnInit, OnDestroy {
  private readonly _QuestionService = inject(QuestionService);
  private readonly platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  e_id: InputSignal<string> = input('');
  showScore :WritableSignal<boolean> = signal(false);
  score !:ScoreAdaptorRes;
  questionsOnExam !: Question[];
  index: number = 0;
  startIndex: number = 0;
  answers : Answer[] = [];
  duration !:number;
  time !:number;
  minutes !:number;
  seconds :number = 0;
  allQuestionsOnExamID !: Subscription;
  checkQuestionsID !: Subscription;
  chart:any;
  data:any;
  config:any;
  total!:number;
  //@ViewChild('myScore')scoreChart !: ElementRef;

  doughnutChartLabels!: string[];
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartType!: ChartType;

  ngOnInit(): void {
    this.startExam(this.e_id());
    
    let intervalId = setInterval(() => {
      if(this.seconds === 0){
        this.minutes = this.minutes -1;
        this.seconds = 59;
      }else{
        this.seconds = this.seconds - 1;
      }
      if(this.minutes === 0){
        clearInterval(intervalId);
        this.submit();
      }
  }, 1000)

  }

  startExam(e_id: string) {
    this.allQuestionsOnExamID = this._QuestionService.getAllQuestionsOnExam(e_id).subscribe({
      next: (res) => {
        this.questionsOnExam = res.questions;
        this.duration = res.questions[0].exam.duration;
        this.minutes = res.questions[0].exam.duration;
      }
    })
  }

  selectAnswer(q_id: string, key: string) {
    let index = this.answers.findIndex((ans) => ans.questionId === q_id);
    if (index == -1) {
      this.answers.push({ questionId: q_id, correct: key });
      sessionStorage.setItem('answers' , JSON.stringify(this.answers));
    } else {
      this.answers[index].correct = key;
      sessionStorage.setItem('answers' , JSON.stringify(this.answers));
    }
  }

  isSelected(q_id:string , key: string): boolean {
    return this.answers.some(answer => answer.questionId === q_id && answer.correct === key);
  }

  check(q_id:string): boolean{
    return this.answers.some(answer => answer.questionId === q_id);
  }

  answersMap(q_id:string):string{
  let index = this.answers.findIndex( (q)=> q.questionId == q_id );
  return this.answers[index].correct;
  }

  nextQuestion() {
    if (this.index < this.questionsOnExam.length -1) {
      this.index++;
    }else{
      this.submit();
      this.showScore.update( (value)=> value = true );
    }
  }
  previousQuestion() {
    if (this.index > 0) {
      this.index--;
    }
  }

  submit(){
    this.time = this.duration - this.minutes;
      this.checkQuestionsID = this._QuestionService.checkQuestions({ answers: this.answers , time: this.time }).subscribe({
        next: (res)=>{
          this.score = res;
          //this.initChart();
          console.log(this.score)
          //  this.data = {
          //   labels: [
          //     'correct',
          //     'incorrect'
          //   ],
          //   datasets: [{
          //     label: 'score',
          //     data: [this.score.correct, this.score.wrong],
          //     backgroundColor: [
          //       'rgb(2, 54, 156)',
          //       'rgb(204, 16, 16)'
          //     ],
          //     hoverOffset: 4
          //   }]
          // };
          //  this.config = {
          //   type: 'doughnut',
          //   data: this.data,
          // };
          // this.chart = new Chart(this.scoreChart.nativeElement , this.config);
        }
      })
  }

  showResults(){
    this.index = 0;
    this.showScore.update( (value)=> value = false )
  }

  initChart() {
    this.doughnutChartLabels = [this.score.total];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [30,50] }],
    };
    this.doughnutChartType = 'doughnut';
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.allQuestionsOnExamID?.unsubscribe();
    this.checkQuestionsID?.unsubscribe();
    sessionStorage.removeItem('answers');
  }

}
