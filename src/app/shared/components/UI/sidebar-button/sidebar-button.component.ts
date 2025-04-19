import { Component, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-button',
  imports: [ RouterLink , RouterLinkActive ],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss'
})
export class SidebarButtonComponent {

  text :InputSignal<string> = input('');
  link :InputSignal<string> = input('');  

}
