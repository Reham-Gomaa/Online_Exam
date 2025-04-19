import { Component, inject, OnInit } from '@angular/core';
import { QuestionService } from '../../services/Questions/question.service';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{

  _QuestionService = inject(QuestionService);

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(){
    this._QuestionService.getUserHistory().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }

}
