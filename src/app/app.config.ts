import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { headerInterceptor } from './Core/Interceptor/Header/header.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './Core/Interceptor/loader.interceptor';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../Assets/images/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
  provideAnimations(),
  provideToastr(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loaderInterceptor])),
  importProvidersFrom(RouterModule, ToastrModule.forRoot(), BrowserAnimationsModule,
  TranslateModule.forRoot({
    defaultLanguage:'en',
    loader:{
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })),
  ]
};


