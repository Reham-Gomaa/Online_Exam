import { Component , OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'auth-api';
import { jwtDecode } from 'jwt-decode';
import { assign } from '../../../store/token.action';
import { IToken } from '../../interfaces/itoken';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, FormbuttonComponent, InputalertComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnDestroy{
  tPassword :boolean = true;
  signID !: Subscription;

  constructor ( 
    private _AuthApiService : AuthApiService ,
    private _Store : Store<{token:IToken}> ,
    private _Router : Router
  ){}

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
    this.tPassword = !this.tPassword;
  }

  ngOnDestroy(): void {
    this.signID?.unsubscribe();
  }
  
}