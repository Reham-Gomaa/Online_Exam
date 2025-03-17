import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { ISignupData } from './interface/isignup-data';
import { AdaptorResponse } from './interface/isignup-response';
import { AuthApi } from './base/AuthApi';
import { ISigninData } from './interface/isignin-data';
import { IForgotPasswordData } from './interface/iforgot-password-data';
import { IForgotPasswordResponse } from './interface/iforgot-password-response';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi{

  constructor(
    private _HttpClient : HttpClient ,
    private _AuthApiAdaptorService : AuthApiAdaptorService
  ) { }

  Signup(data:ISignupData):Observable<AdaptorResponse>{
    return this._HttpClient.post( AuthEndPoint.SIGN_UP , data ).pipe(
      map( (res:any)=>  this._AuthApiAdaptorService.adapt(res) ) ,
      catchError( (err)=> of(err) )
    )
  }

  Signin(data: ISigninData): Observable<AdaptorResponse> {
    return this._HttpClient.post( AuthEndPoint.SIGN_IN , data ).pipe(
      map( (res:any)=> this._AuthApiAdaptorService.adapt(res) ),
      catchError( (err)=> of(err) )
    )
  }

  ForgotPassword(data: IForgotPasswordData):Observable<any>{
    return this._HttpClient.post( AuthEndPoint.FORGOT_PASSWORD , data )
  }
}
