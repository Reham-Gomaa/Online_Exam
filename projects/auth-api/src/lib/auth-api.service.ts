import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { ForgotPasswordAdaptorService } from './adaptor/forgot-password-adaptor.service';
import { ResetPasswordAdaptorService } from './adaptor/reset-password-adaptor.service';
import { VerifyCodeAdaptorService } from './adaptor/verify-code-adaptor.service';
import { AuthApi } from './base/AuthApi';
import { AuthEndPoint } from './enums/AuthApi.endPoints';
import { IForgotPasswordData } from './interface/iforgot-password-data';
import { IForgotPasswordAdaptorResponse } from './interface/iforgot-password-response';
import { IResetPassword } from './interface/ireset-password';
import { ISigninData } from './interface/isignin-data';
import { ISignupData } from './interface/isignup-data';
import { AdaptorResponse } from './interface/isignup-response';
import { IVerifyCodeRes } from './interface/iverify-code-res';
import { ResetPasswordِAdaptorRes } from './interface/reset-password-res';
import { Base_Url } from './token/BaseUrl.token';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi{
  
  private readonly _Base_Url = inject(Base_Url);
  private readonly _HttpClient = inject(HttpClient);
  private readonly _AuthApiAdaptorService = inject(AuthApiAdaptorService);
  private readonly _ForgotPasswordAdaptorService = inject(ForgotPasswordAdaptorService);
  private readonly _VerifyCodeAdaptorService = inject(VerifyCodeAdaptorService);
  private readonly _ResetPasswordAdaptorService = inject(ResetPasswordAdaptorService);

  constructor() { }

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
