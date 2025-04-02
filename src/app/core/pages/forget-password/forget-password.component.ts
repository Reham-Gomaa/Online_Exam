import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { VerifyCodeComponent } from "../verify-code/verify-code.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FormbuttonComponent, VerifyCodeComponent, InputalertComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy{

  private readonly _AuthApiService = inject(AuthApiService);
  private readonly _Router = inject(Router);

  forgotPassID !: Subscription;
  forgetFlow :WritableSignal<number> = signal(1);

  constructor (){}

  forgotPasswordForm :FormGroup = new FormGroup({
    email : new FormControl(null , [ Validators.required , Validators.email ])
  })

  forgotPassword(){
    this.forgotPassID = this._AuthApiService.ForgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res)=>{
        sessionStorage.setItem('email' , this.forgotPasswordForm.get('email')?.value);
        this.forgetFlow.update( (value)=> value = 2 );
      }
    })
  }

  ngOnDestroy(): void {
    this.forgotPassID?.unsubscribe();
  }

}
