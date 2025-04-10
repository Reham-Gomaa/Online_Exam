import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IToken } from '../../../core/interfaces/itoken';
import { Subject } from '../../interfaces/subject/iall-subject-res';
import { SubjectService } from '../../services/subject/subject.service';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  implements OnInit , OnDestroy{
  private readonly _SubjectService = inject(SubjectService);

  allSubjects !: Subject[];
  userInfo$ !: Observable<IToken>;
  allSubjectID !:Subscription;

  // constructor( private _Store : Store<{token : IToken}> ){
  //   this.userInfo$ = this._Store.select( selectToken )
  // }

  ngOnInit(): void {
    this.getAllSubjects()
  }

  getAllSubjects(){
    this.allSubjectID = this._SubjectService.getAllSubjects().subscribe({
      next: (res)=> { 
        this.allSubjects = res.subjects;
      }
    })
  }

  ngOnDestroy(): void {
    this.allSubjectID?.unsubscribe();
  }

}
