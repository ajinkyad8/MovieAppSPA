import { Routes } from '@angular/router';
import { UserMainComponent } from './user-main/user-main.component';
import { AuthenticationGuard } from '../helpers/authentication.guard';

export const userRoutes: Routes = [
    {path: '', component: UserMainComponent, canActivate: [AuthenticationGuard]}
];
