import { Routes } from '@angular/router';
import { AuthenticationGuard } from '../helpers/authentication.guard';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

export const movieRoutes: Routes = [
    {path: 'edit', component: MovieEditComponent, canActivate: [AuthenticationGuard], data : {role : ['Admin', 'Moderator', 'User']}},
    {path: '', component: MovieListComponent},
    {path: 'detail', component: MovieDetailComponent},
];
