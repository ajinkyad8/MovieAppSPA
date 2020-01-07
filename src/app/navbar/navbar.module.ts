import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../app.routes';



@NgModule({
  declarations: [
    NavbarComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ], exports: [NavbarComponent]
})
export class NavbarModule { }
