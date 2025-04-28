import { Component, DoCheck, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarButtonComponent } from "../../../../shared/components/UI/sidebar-button/sidebar-button.component";
import { SidebarComponent } from "../../../pages/sidebar/sidebar.component";
import { Subscription } from 'rxjs';
import { AuthApiService } from '../../../../../../projects/auth-api/src/public-api';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet , SidebarComponent, SidebarButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit , OnDestroy{
  private readonly _Store = inject(Store);
  private readonly _Router = inject(Router);
  private readonly _AuthApiService = inject(AuthApiService);

  routerEventID !:Subscription;

  currentUrl: string = '';

  ngOnInit(): void {
    this.currentUrl = this._Router.url;
    this.routerEventID = this._Router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  logOut(){
    this._AuthApiService.logOut().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
    sessionStorage.clear()
    //this._Store.select('token')
    this._Router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this.routerEventID?.unsubscribe();
  }
}
