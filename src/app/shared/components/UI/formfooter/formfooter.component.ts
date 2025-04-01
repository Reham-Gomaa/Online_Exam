import { Component } from '@angular/core';
import { ISocialIcons } from '../../../../core/interfaces/isocial-icons';

@Component({
  selector: 'app-formfooter',
  imports: [],
  templateUrl: './formfooter.component.html',
  styleUrl: './formfooter.component.scss'
})
export class FormfooterComponent {
  images :ISocialIcons[] = [
    { id : 1 , src : "./images/Logo Google.png", title : "google icon" },
    { id : 2 , src : "./images/Logo twitter.png", title : "twitter icon" },
    { id : 3 , src : "./images/Logo facebook.png", title : "facebook icon" },
    { id : 4 , src : "./images/Logo apple.png", title : "apple icon" }
  ]
}
