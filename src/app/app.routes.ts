import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'artist', loadChildren: () => import('./artist/artist.module').then(mod => mod.ArtistModule)},
    {path: 'movie', loadChildren: () => import('./movie/movie.module').then(mod => mod.MovieModule)},
    {path: 'moderator', loadChildren: () => import('./moderator/moderator.module').then(mod => mod.ModeratorModule)},
    {path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)},
    {path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
    {path: '**', redirectTo: '', pathMatch: 'full'}];
