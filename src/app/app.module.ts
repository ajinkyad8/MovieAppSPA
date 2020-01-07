import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DragDropDirective } from './helpers/DragDropDirective';
import { HomeComponent } from './home/home.component';
import { AlertsModule } from './alerts/alerts.module';
import { NavbarModule } from './navbar/navbar.module';
import { ErrorInterceptorProvider } from './services/error.interceptor';

export function GetToken() {
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      DragDropDirective,
      HomeComponent
   ],
   imports: [
      AlertsModule,
      NavbarModule,
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter: GetToken,
           whitelistedDomains: ['localhost:5000']
         }
       })
      ],
   providers: [
      ErrorInterceptorProvider,
      Title
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
