import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from '../../interfaces/Exams/iexam-on-subject-res';
import { Question } from '../../interfaces/Questions/iquestions-on-exam-res';
import { ExamsService } from '../../services/Exams/exams.service';
import { QuestionService } from '../../services/Questions/question.service';
import { SubjectService } from '../../services/subject/subject.service';
import { ExamModalComponent } from "../exam-modal/exam-modal.component";

@Component({
  selector: 'app-diploma',
  imports: [ExamModalComponent],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.scss'
})
export class DiplomaComponent implements OnInit, OnDestroy {
  //private readonly _SubjectService = inject(SubjectService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ExamsService = inject(ExamsService);

  examsOnSub !: Exam[];
  subject_id !: string;
  exam_id : WritableSignal<string> = signal('');
  showModal: WritableSignal<boolean> = signal(false);
  start: WritableSignal<boolean> = signal(false);
  examsOnSubjectID !: Subscription;
  SubjectID !: Subscription;
  //singleSubjectID !:Subscription;

  ngOnInit(): void {
    this.SubjectID = this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.subject_id = param.get('s_id')!
      }
    })

    this.getAllExamsOnSubject(this.subject_id);

    //this.getSingleSubject(this.subject_id);
  }

  getAllExamsOnSubject(s_id: string) {
    this.examsOnSubjectID = this._ExamsService.getAllExamsOnSubject(s_id).subscribe({
      next: (res) => {
        this.examsOnSub = res.exams;
      }
    })
  }

  showInstructions(e_id:string) {
    this.showModal.update((value) => value = true);
    this.exam_id.update((value) => value = e_id);
    console.log(this.exam_id())
  }

  startExam() {
    this.start.update((value) => value = true);
  }

  // getSingleSubject(s_id:string){
  //   this.singleSubjectID = this._SubjectService.getSingleSubject(s_id).subscribe({
  //     next: (res)=> { 
  //       console.log(res) 
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //   })
  // }

  ngOnDestroy(): void {
    this.SubjectID?.unsubscribe();
    //this.singleSubjectID?.unsubscribe();
  }

}
