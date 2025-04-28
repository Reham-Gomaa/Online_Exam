import { Injectable } from '@angular/core';
import { IAdapt } from '../../../../../src/app/features/interfaces/iadapt';
import { LogoutRes } from '../interface/logout';

@Injectable({
  providedIn: 'root'
})
export class LogoutAdaptorService implements IAdapt{

  constructor() { }

  adapt(data: any):LogoutRes {
    return { message: data }
  }
}
