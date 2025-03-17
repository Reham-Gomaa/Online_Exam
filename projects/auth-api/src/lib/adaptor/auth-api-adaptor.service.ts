import { Injectable } from '@angular/core';
import { IAdaptor } from '../interface/adaptor';
import { ISignupData } from '../interface/isignup-data';
import { AdaptorResponse, ISignupResponse } from '../interface/isignup-response';
import { IForgotPasswordData } from '../interface/iforgot-password-data';
import { IForgotPasswordResponse } from '../interface/iforgot-password-response';

@Injectable({
  providedIn: 'root'
})
export class AuthApiAdaptorService implements IAdaptor{

  constructor() { }

  adapt(data: ISignupResponse):AdaptorResponse {
    return {
      token : data.token,
      userName : data.user.username,
      userEmail : data.user.email
    }
  }

}
