import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarButtonComponent } from "../../../shared/components/UI/sidebar-button/sidebar-button.component";

@Component({
  selector: 'app-sidebar',
  imports: [SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
