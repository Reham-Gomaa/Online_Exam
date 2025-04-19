import { Component, inject, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarButtonComponent } from "../../../../shared/components/UI/sidebar-button/sidebar-button.component";
import { SidebarComponent } from "../../../pages/sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet , SidebarComponent, SidebarButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  private readonly _Store = inject(Store);
  private readonly _Router = inject(Router);

  currentUrl: string = '';

  ngOnInit(): void {
    this._Router.events.subscribe(event => {
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
}
