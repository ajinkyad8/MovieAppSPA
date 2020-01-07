import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminRoleTypeComponent } from './admin-role-type/admin-role-type.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';



@NgModule({
  declarations: [
    AdminComponent,
    AdminUserComponent,
    AdminRoleTypeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ], exports: []
})
export class AdminModule { }
