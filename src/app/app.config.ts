import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { TokenInterceptorProvider } from './_helper/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr(),
    TokenInterceptorProvider
  ]
};
