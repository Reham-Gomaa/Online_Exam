import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarComponent } from "../../../pages/sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private readonly _Store = inject(Store);
  private readonly _Router = inject(Router);
  
  logOut(){
    sessionStorage.clear()
    //this._Store.select('token')
    this._Router.navigate(['/signin']);
  }
}
