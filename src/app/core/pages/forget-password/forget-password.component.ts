import { Component } from '@angular/core';
import { FormFooterComponent } from '../../layouts/auth-layout/components/form-footer/form-footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthApiComponent, AuthApiService } from 'auth-api';

@Component({
  selector: 'app-forget-password',
  imports: [ FormFooterComponent , ReactiveFormsModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  constructor ( private _AuthApiService : AuthApiService ){}

  forgotPasswordForm :FormGroup = new FormGroup({
    email : new FormControl(null , Validators.required)
  })

  forgotPassword(){
    this._AuthApiService.ForgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }

}
