import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken } from '../../../core/interfaces/itoken';
import { Store } from '@ngrx/store';
import { selectToken } from '../../../store/token.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ AsyncPipe ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {
  userInfo$ !: Observable<IToken>

  constructor( private _Store : Store<{token : IToken}> ){
    this.userInfo$ = this._Store.select( selectToken )
  }

 
}
