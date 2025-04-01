import { Component, inject, OnDestroy } from '@angular/core';
import { AuthApiAdaptorService } from '../../../../../projects/auth-api/src/lib/adaptor/auth-api-adaptor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { SetPasswordComponent } from "../set-password/set-password.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, FormbuttonComponent, SetPasswordComponent, InputalertComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent implements OnDestroy{
  forgetFlow :number = 2;
  verifyCodeID !: Subscription;
  resendID !: Subscription;

  private readonly _AuthApiService = inject(AuthApiService);
  private readonly _Router = inject(Router);

  verificationForm :FormGroup = new FormGroup({
    resetCode : new FormControl(null , Validators.required)
  })

  verifyCoode(){
    this.verifyCodeID = this._AuthApiService.verifyResetCode(this.verificationForm.get('resetCode')?.value).subscribe({
      next: (res)=>{
        this.forgetFlow = 3;
      }
    })
  }

  resend(){
    this.resendID = this._AuthApiService.ForgotPassword({email:sessionStorage.getItem('email')!}).subscribe()
  }

  ngOnDestroy(): void {
    this.verifyCodeID?.unsubscribe();
    this.resendID?.unsubscribe();
  }

}
