import { Injectable } from '@angular/core';
import { IAdaptor } from '../interface/adaptor';
import { IForgotPasswordAdaptorResponse, IForgotPasswordResponse } from '../interface/iforgot-password-response';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordAdaptorService implements IAdaptor{

  constructor() { }

  adapt(data: IForgotPasswordResponse):IForgotPasswordAdaptorResponse {
    return { info : data.info }
  }
}
