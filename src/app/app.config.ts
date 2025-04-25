import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { tokenReducer } from './store/token.reducer';
//import { Base_Url } from 'auth-api';
import { Base_Url } from '../../projects/auth-api/src/public-api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([ reqHeaderInterceptor , resErrorInterceptor , loadingInterceptor ])),
    provideStore( {'token' : tokenReducer} ),
    importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule),
    provideToastr(),
    { provide: Base_Url , useValue: `https://exam.elevateegy.com/api/v1` },
    provideAnimations()
]
};
