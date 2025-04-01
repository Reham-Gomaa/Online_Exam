import { Injectable } from '@angular/core';
import { IAdaptor } from '../interface/adaptor';
import { IVerifyCodeRes } from '../interface/iverify-code-res';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeAdaptorService implements IAdaptor{

  constructor() { }

  adapt(data: IVerifyCodeRes):IVerifyCodeRes {
    return {status:data.status}
  }
}
