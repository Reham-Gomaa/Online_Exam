import { Observable } from "rxjs";
import { ISignupData } from "../interface/isignup-data";
import { AdaptorResponse } from "../interface/isignup-response";
import { ISigninData } from "../interface/isignin-data";
import { IForgotPasswordData } from "../interface/iforgot-password-data";
import { IForgotPasswordResponse } from "../interface/iforgot-password-response";

export abstract class AuthApi {
    
    abstract Signup(data:ISignupData):Observable<AdaptorResponse> ;
    abstract Signin (data:ISigninData):Observable<AdaptorResponse> ;
    abstract ForgotPassword (data:IForgotPasswordData):Observable<IForgotPasswordResponse> ;
}