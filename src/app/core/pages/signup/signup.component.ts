import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormbuttonComponent } from "../../../shared/components/UI/formbutton/formbutton.component";
import { InputalertComponent } from "../../../shared/components/UI/inputalert/inputalert.component";

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, FormbuttonComponent, InputalertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy{
  tPassword :boolean = true;
  signupID !: Subscription;

  constructor ( 
    private _AuthApiService : AuthApiService ,
    private _Router : Router
   ){}

  registerForm :FormGroup = new FormGroup( {
    username :new FormControl( null ) ,
    firstName :new FormControl( null , [ Validators.required , Validators.minLength(3) ] ) ,
    lastName :new FormControl( null , [ Validators.required , Validators.minLength(3) ] ) ,
    email :new FormControl( null , [ Validators.required , Validators.email ] ) ,
    password :new FormControl( null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)] ) ,
    rePassword :new FormControl( null ) ,
    phone :new FormControl( null , [ Validators.required , Validators.pattern( /^01[0125][0-9]{8}$/ ) ] ) ,
  } , this.compare )

  compare(group:AbstractControl){
    if(group.get('password')?.value === group.get('rePassword')?.value){
      return null;
    }else{
      return { missMatch : true };
    }
  }

  signUp(){
    if(this.registerForm.valid){
      this.registerForm.get('username')?.setValue( (this.registerForm.get('firstName')?.value)+(this.registerForm.get('lastName')?.value) )
      this.signupID = this._AuthApiService.Signup( this.registerForm.value ).subscribe({
        next: (res)=>{
          this._Router.navigate(['/signin']);
        }
      })
    }else{
      this.registerForm.markAllAsTouched();
      this.registerForm.setErrors( { missMatch : true } );
    }
  }

  changetype(){
    this.tPassword = !this.tPassword;
  }

  ngOnDestroy(): void {
    this.signupID?.unsubscribe();
  }
  
}
