import { Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from '../../interfaces/Exams/iexam-on-subject-res';
import { ExamsService } from '../../services/Exams/exams.service';
import { QuestionService } from '../../services/Questions/question.service';
import { ExamModalComponent } from "../exam-modal/exam-modal.component";

@Component({
  selector: 'app-diploma',
  imports: [ExamModalComponent],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ExamsService = inject(ExamsService);
  private readonly _QuestionService = inject(QuestionService);

  closeModal = computed(() => this._QuestionService.closeModal());
  
  examsOnSub : Exam[] = [] as Exam[];
  examStartSignal :WritableSignal<boolean> = signal(false);
  subject_id !: string;
  exam_id !: string;
  showModal: WritableSignal<boolean> = signal(false);
  start: WritableSignal<boolean> = signal(false);
  examsOnSubjectID !: Subscription;
  SubjectID !: Subscription;

  ngOnInit(): void {
    this.SubjectID = this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.subject_id = param.get('s_id')!
      }
    })

    this.getAllExamsOnSubject(this.subject_id);
  }

  getAllExamsOnSubject(s_id: string) {
    this.examsOnSubjectID = this._ExamsService.getAllExamsOnSubject(s_id).subscribe({
      next: (res) => {
        this.examsOnSub = res.exams;
      }
    })
  }

  showInstructions(e_id:string) {
    this.exam_id = '';
    this.showModal.set(true);
    this._QuestionService.closeModal.set(false);
    this.exam_id = e_id;
    // setTimeout(() => {
    //   this.exam_id = e_id;
    //   this.showModal.set(true);
    //   this._QuestionService.closeModal.set(false);
    //   console.log('exam_id', this.exam_id);
    // }, 1000);
  }

  startExam() {
    this.start.set(true);
    this.examStartSignal.set(true);
  }

  Exit(){
    this.showModal.set(false);
    this.exam_id = '';
  }

  ngOnDestroy(): void {
    this.SubjectID?.unsubscribe();
  }

}
