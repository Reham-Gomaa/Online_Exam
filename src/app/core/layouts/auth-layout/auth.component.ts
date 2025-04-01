import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormfooterComponent } from "../../../shared/components/UI/formfooter/formfooter.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, RouterLink, FormfooterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
