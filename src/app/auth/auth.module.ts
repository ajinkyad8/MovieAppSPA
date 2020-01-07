import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes)
  ], exports: []
})
export class AuthModule { }
