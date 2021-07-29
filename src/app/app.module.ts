import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './core/services/auth-interceptor-service/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthErrorInterceptorService } from './core/services/auth-error-interceptor-service/auth-error-interceptor.service';
import { CheckPermissionsDirective } from './core/direcitves/check-permissions.directive';

@NgModule({
  declarations: [AppComponent, CheckPermissionsDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [CheckPermissionsDirective],
})
export class AppModule {}
