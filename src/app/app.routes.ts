import { Routes } from '@angular/router';
import { SigninComponent } from './core/pages/signin/signin.component';
import { AuthComponent } from './core/layouts/auth-layout/auth.component';
import { MainComponent } from './core/layouts/main-layout/main/main.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { DiplomaComponent } from './features/diploma/diploma/diploma.component';

export const routes: Routes = [
    {path:'' , component: AuthComponent , children:[
        {path:'' , redirectTo: 'signin' , pathMatch: 'full'},
        {path:'signin' , component: SigninComponent , title: 'Signin'},
        {path:'signup' , loadComponent: ()=> import('./core/pages/signup/signup.component').then((c) => c.SignupComponent ) , title: 'Signup'},
        {path:'forgetpassword' , loadComponent:()=> import('./core/pages/forget-password/forget-password.component').then((c)=> c.ForgetPasswordComponent) , title: 'Forget-Password'},
    ]},

    { path : '' , component: MainComponent , canActivate: [ authGuard ] , children: [
        { path: '' , redirectTo: 'dashboard' , pathMatch: 'full' },
        { path: 'dashboard' , component: DashboardComponent , title: 'Dashboard' },
        { path: 'diploma' , loadComponent: ()=> import('./features/diploma/diploma/diploma.component').then( (c)=> c.DiplomaComponent ) , title: 'Diploma' },
        { path: '**' , loadComponent: ()=> import('./core/pages/wildcard/wildcard.component').then( (c)=> c.WildcardComponent  ) , title: 'Not Found' }
    ] }
];
