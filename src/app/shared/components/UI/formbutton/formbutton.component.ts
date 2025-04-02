import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-formbutton',
  imports: [],
  templateUrl: './formbutton.component.html',
  styleUrl: './formbutton.component.scss'
})
export class FormbuttonComponent {
  text :InputSignal<string> = input('');
}
