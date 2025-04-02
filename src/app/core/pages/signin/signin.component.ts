import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'auth-api';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";
import { assign } from '../../../store/token.action';
import { IToken } from '../../interfaces/itoken';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, FormbuttonComponent, InputalertComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy{

  private readonly _AuthApiService = inject(AuthApiService);
  private readonly _Store = inject(Store<{token:IToken}>);
  private readonly _Router = inject(Router);

  tPassword :WritableSignal<boolean> = signal(true);
  signID !: Subscription;

  constructor (){}

  loginForm : FormGroup = new FormGroup({
    email : new FormControl( null , [Validators.required , Validators.email] ),
    password : new FormControl( null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] ),
  })

  signIn(){
    if(this.loginForm.valid){
      this.signID = this._AuthApiService.Signin(this.loginForm.value).subscribe({
        next: (res)=>{
          sessionStorage.setItem( 'token' , res.token )
          let x = jwtDecode(sessionStorage.getItem('token')!)
          if(sessionStorage.getItem('token')){
            this._Store.dispatch(assign({value:jwtDecode(sessionStorage.getItem('token')!)}))
          }
          this._Router.navigate(['/dashboard'])
        },
        error: (err)=>{
          console.log(err)
        }
      })
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  changeType(){
    this.tPassword.update( (value)=> value = !this.tPassword() );
  }

  ngOnDestroy(): void {
    this.signID?.unsubscribe();
  }
  
}