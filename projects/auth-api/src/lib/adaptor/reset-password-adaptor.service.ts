import { Injectable } from '@angular/core';
import { IAdaptor } from '../interface/adaptor';
import { ResetPasswordRes, ResetPasswordِAdaptorRes } from '../interface/reset-password-res';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordAdaptorService implements IAdaptor{

  constructor() { }

  adapt(data: ResetPasswordRes):ResetPasswordِAdaptorRes {
    return { token: data.token }
  }
}
