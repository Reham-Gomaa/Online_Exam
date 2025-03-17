import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { FormFooterComponent } from '../../layouts/auth-layout/components/form-footer/form-footer.component';

@Component({
  selector: 'app-signin',
  imports: [ FormFooterComponent , ReactiveFormsModule ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  constructor ( private _AuthApiService : AuthApiService ){}

  loginForm : FormGroup = new FormGroup({
    email : new FormControl( null , Validators.required ),
    password : new FormControl( null , Validators.required ),
  })

  signIn(){
    this._AuthApiService.Signin(this.loginForm.value).subscribe({
      next: (res)=>{
        console.log(res)
      }
    })
  }
}
