import { Observable } from "rxjs";
import { IForgotPasswordData } from "../interface/iforgot-password-data";
import { ISigninData } from "../interface/isignin-data";
import { ISignupData } from "../interface/isignup-data";
import { AdaptorResponse } from "../interface/isignup-response";
import { IResetPassword } from "../interface/ireset-password";

export abstract class AuthApi {
    
    abstract Signup(data:ISignupData):Observable<AdaptorResponse> ;
    abstract Signin (data:ISigninData):Observable<AdaptorResponse> ;
    abstract ForgotPassword (data:IForgotPasswordData):Observable<any> ;
    abstract verifyResetCode(code:string):Observable<any>;
    abstract  resetPassword(data:IResetPassword):Observable<any>
}