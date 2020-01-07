import { NgModule } from '@angular/core';
import { UserMainComponent } from './user-main/user-main.component';
import { UserMovieRoleComponent } from './user-movie-role/user-movie-role.component';
import { UserMovieListComponent } from './user-movie-list/user-movie-list.component';
import { UserMovieEditComponent } from './user-movie-edit/user-movie-edit.component';
import { UserArtistListComponent } from './user-artist-list/user-artist-list.component';
import { UserArtistEditComponent } from './user-artist-edit/user-artist-edit.component';
import { UserMovieRoleEditComponent } from './user-movie-role-edit/user-movie-role-edit.component';
import { UserArtistPhotoComponent } from './user-artist-photo/user-artist-photo.component';
import { UserMoviePhotoComponent } from './user-movie-photo/user-movie-photo.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserMainComponent,
    UserMovieRoleComponent,
    UserMovieListComponent,
    UserMovieEditComponent,
    UserArtistListComponent,
    UserArtistEditComponent,
    UserMovieRoleEditComponent,
    UserArtistPhotoComponent,
    UserMoviePhotoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(userRoutes)
  ], exports: []
})
export class UserModule { }
