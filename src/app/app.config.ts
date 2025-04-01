import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { tokenReducer } from './store/token.reducer';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Base_Url } from 'auth-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch() , withInterceptors([ reqHeaderInterceptor , resErrorInterceptor , loadingInterceptor ])),
    provideStore( {'token' : tokenReducer} ),
    importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule),
    provideToastr(),
    { provide: Base_Url , useValue: `https://exam.elevateegy.com/api/v1` }
]
};
