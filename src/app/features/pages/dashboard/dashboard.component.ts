import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IToken } from '../../../core/interfaces/itoken';
import { Subject } from '../../interfaces/subject/iall-subject-res';
import { SubjectService } from '../../services/subject/subject.service';
import { animate, state, style, transition, trigger }  from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  imports: [ RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations:[
    trigger( 'view' , [
      state( 'show' , style({
        opacity: '1',
        transform: 'translateY(0px)'
      }) ),
      transition( 'void => *' , [
        style({
          opacity: '0',
          transform: 'translateY(-100px)'
        }),
        animate(300)
      ] )
    ] )
  ]
})
export class DashboardComponent  implements OnInit , OnDestroy{
  private readonly _SubjectService = inject(SubjectService);

  allSubjects !: Subject[];
  userInfo$ !: Observable<IToken>;
  allSubjectID !:Subscription;

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
