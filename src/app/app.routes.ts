import { Routes } from '@angular/router';
import { SigninComponent } from './core/pages/signin/signin.component';
import { AuthComponent } from './core/layouts/auth-layout/auth.component';

export const routes: Routes = [
    {path:'' , component: AuthComponent , children:[
        {path:'' , redirectTo: 'signin' , pathMatch: 'full'},
        {path:'signin' , component: SigninComponent , title: 'Signin'},
        {path:'signup' , loadComponent: ()=> import('./core/pages/signup/signup.component').then((c) => c.SignupComponent ) , title: 'Signup'},
        {path:'forgetpassword' , loadComponent:()=> import('./core/pages/forget-password/forget-password.component').then((c)=> c.ForgetPasswordComponent) , title: 'Forget-Password'},
        {path:'verifycode' , loadComponent: ()=> import('./core/pages/verify-code/verify-code.component').then((c)=> c.VerifyCodeComponent) , title: 'Verify-Code'},
        {path:'setpassword' , loadComponent: ()=> import('./core/pages/set-password/set-password.component').then((c)=> c.SetPasswordComponent) , title: 'Set-Password'},
    ]}
];
