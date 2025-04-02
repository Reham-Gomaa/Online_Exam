import { isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnDestroy, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { AuthApiService } from 'auth-api';
import { Router } from '@angular/router';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { Subscription } from 'rxjs';
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";

@Component({
  selector: 'app-set-password',
  imports: [ReactiveFormsModule, FormbuttonComponent, InputalertComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent implements OnDestroy {

  private readonly _AuthApiService = inject(AuthApiService);
  private readonly _Router = inject(Router);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  tPassword: WritableSignal<boolean> = signal(true);
  email !: string;
  resetID !: Subscription;


  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null)
  }, this.compare)

  compare(group: AbstractControl) {
    if (group.get('newPassword')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      return { missMatch: true };
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      if (isPlatformBrowser(this._PLATFORM_ID)) {
        if (sessionStorage.getItem('email')) {
          this.email = sessionStorage.getItem('email')!;

          this.resetID = this._AuthApiService.resetPassword(
            { email: this.email, newPassword: this.resetPasswordForm.get('newPassword')?.value }
          ).subscribe({
            next: (res) => {
              console.log(res)
              this._Router.navigate(['/signin']);
            },
            error: (err) => {
              console.log(err)
            }
          })
        }
      }
    } else {
      this.resetPasswordForm.setErrors({ missMatch: true })
    }
  }

  changeType() {
    this.tPassword.update( (value)=> value = !this.tPassword );
  }

  ngOnDestroy(): void {
    this.resetID?.unsubscribe();
  }
}
