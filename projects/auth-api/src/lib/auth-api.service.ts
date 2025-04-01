import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { ISignupData } from './interface/isignup-data';
import { AdaptorResponse } from './interface/isignup-response';
import { AuthApi } from './base/AuthApi';
import { ISigninData } from './interface/isignin-data';
import { IForgotPasswordData } from './interface/iforgot-password-data';
import { IForgotPasswordAdaptorResponse, IForgotPasswordResponse } from './interface/iforgot-password-response';
import { ForgotPasswordAdaptorService } from './adaptor/forgot-password-adaptor.service';
import { IResetPassword } from './interface/ireset-password';
import { Base_Url } from 'auth-api';
import { VerifyCodeAdaptorService } from './adaptor/verify-code-adaptor.service';
import { IVerifyCodeRes } from './interface/iverify-code-res';
import { ResetPasswordAdaptorService } from './adaptor/reset-password-adaptor.service';
import { ResetPasswordِAdaptorRes } from './interface/reset-password-res';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi{
  private readonly _Base_Url = inject(Base_Url)

  constructor(
    private _HttpClient : HttpClient ,
    private _AuthApiAdaptorService : AuthApiAdaptorService,
    private _ForgotPasswordAdaptorService : ForgotPasswordAdaptorService,
    private _VerifyCodeAdaptorService : VerifyCodeAdaptorService,
    private _ResetPasswordAdaptorService : ResetPasswordAdaptorService
  ) { }

  Signup(data:ISignupData):Observable<AdaptorResponse>{
    return this._HttpClient.post( this._Base_Url+AuthEndPoint.SIGN_UP , data ).pipe(
      map( (res:any)=>  this._AuthApiAdaptorService.adapt(res) ) ,
      catchError( (err)=> of(err) )
    )
  }

  Signin(data: ISigninData): Observable<AdaptorResponse> {
    return this._HttpClient.post( this._Base_Url+AuthEndPoint.SIGN_IN , data ).pipe(
      map( (res:any)=> this._AuthApiAdaptorService.adapt(res) ),
      catchError( (err)=> of(err) )
    )
  }

  ForgotPassword(data: IForgotPasswordData):Observable<IForgotPasswordAdaptorResponse>{
    return this._HttpClient.post( this._Base_Url+AuthEndPoint.FORGOT_PASSWORD , data ).pipe(
      map( (res:any)=> this._ForgotPasswordAdaptorService.adapt(res) )
    )
  }

  verifyResetCode(code:string):Observable<IVerifyCodeRes>{
    return this._HttpClient.post( this._Base_Url+AuthEndPoint.VERIFY_CODE , {"resetCode":code} ).pipe(
      map( (res:any)=> this._VerifyCodeAdaptorService.adapt(res) )
    )
  }

  resetPassword(data:IResetPassword):Observable<ResetPasswordِAdaptorRes>{
    return this._HttpClient.put( this._Base_Url+AuthEndPoint.RESET_PASSWORD , data).pipe(
      map( (res:any)=> this._ResetPasswordAdaptorService.adapt(res) )
    )
  }

}
