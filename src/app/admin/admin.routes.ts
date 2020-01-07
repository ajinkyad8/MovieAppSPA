import { Routes } from '@angular/router';
import { AuthenticationGuard } from '../helpers/authentication.guard';
import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
    {path: '', component: AdminComponent, canActivate: [AuthenticationGuard], data : {role : ['Admin']}}
];
