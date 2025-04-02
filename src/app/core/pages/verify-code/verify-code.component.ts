import { Component, inject, OnDestroy, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";
import { SetPasswordComponent } from "../set-password/set-password.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, FormbuttonComponent, SetPasswordComponent, InputalertComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent implements OnDestroy{

  private readonly _AuthApiService = inject(AuthApiService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  forgetFlow :WritableSignal<number> = signal(2);
  verifyCodeID !: Subscription;
  resendID !: Subscription;


  verificationForm :FormGroup = new FormGroup({
    resetCode : new FormControl(null , Validators.required)
  })

  verifyCoode(){
    this.verifyCodeID = this._AuthApiService.verifyResetCode(this.verificationForm.get('resetCode')?.value).subscribe({
      next: (res)=>{
        this.forgetFlow.update( (value)=> value = 3 );
      }
    })
  }

  resend(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      if(sessionStorage.getItem('email')){
        this.resendID = this._AuthApiService.ForgotPassword({email:sessionStorage.getItem('email')!}).subscribe()
      }
    }
  }

  ngOnDestroy(): void {
    this.verifyCodeID?.unsubscribe();
    this.resendID?.unsubscribe();
  }

}
