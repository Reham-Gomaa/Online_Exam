import { Component } from '@angular/core';
import { FormFooterComponent } from '../../layouts/auth-layout/components/form-footer/form-footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-signup',
  imports: [ FormFooterComponent , ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor ( private _AuthApiService : AuthApiService ){}

  registerForm :FormGroup = new FormGroup( {
    username :new FormControl( null , Validators.required ) ,
    firstName :new FormControl( null , Validators.required ) ,
    lastName :new FormControl( null , Validators.required ) ,
    email :new FormControl( null , Validators.required ) ,
    password :new FormControl( null , Validators.required ) ,
    rePassword :new FormControl( null , Validators.required ) ,
    phone :new FormControl( null , Validators.required ) ,
  } )

  signUp(){
    this.registerForm.get('username')?.setValue( (this.registerForm.get('firstName')?.value)+(this.registerForm.get('lastName')?.value) )
    this._AuthApiService.Signup( this.registerForm.value ).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }
}
