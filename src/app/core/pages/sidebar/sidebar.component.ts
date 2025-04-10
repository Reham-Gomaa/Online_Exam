import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    private readonly _Router = inject(Router);
    
    logOut(){
      sessionStorage.clear()
      //this._Store.select('token')
      this._Router.navigate(['/signin']);
    }

}
