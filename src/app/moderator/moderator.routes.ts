import { Routes } from '@angular/router';
import { ModeratorMainComponent } from './moderator-main/moderator-main.component';
import { AuthenticationGuard } from '../helpers/authentication.guard';

export const moderatorRoutes: Routes = [
    {path: '', component: ModeratorMainComponent, canActivate: [AuthenticationGuard], data: {role : ['Moderator', 'Admin']}}
];
