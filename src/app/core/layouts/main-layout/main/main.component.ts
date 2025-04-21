import { Component, DoCheck, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarButtonComponent } from "../../../../shared/components/UI/sidebar-button/sidebar-button.component";
import { SidebarComponent } from "../../../pages/sidebar/sidebar.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet , SidebarComponent, SidebarButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit , OnDestroy{
  private readonly _Store = inject(Store);
  private readonly _Router = inject(Router);

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
    sessionStorage.clear()
    //this._Store.select('token')
    this._Router.navigate(['/signin']);
  }

  ngOnDestroy(): void {
    this.routerEventID?.unsubscribe();
  }
}
