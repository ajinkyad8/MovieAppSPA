import { NgModule } from '@angular/core';
import { ModeratorMainComponent } from './moderator-main/moderator-main.component';
import { ModeratorMovieComponent } from './moderator-movie/moderator-movie.component';
import { ModeratorMovieActivityComponent } from './moderator-movie-activity/moderator-movie-activity.component';
import { ModeratorArtistComponent } from './moderator-artist/moderator-artist.component';
import { ModeratorArtistActivityComponent } from './moderator-artist-activity/moderator-artist-activity.component';
import { ModeratorMovieRoleComponent } from './moderator-movie-role/moderator-movie-role.component';
import { ModeratorArtistPhotosComponent } from './moderator-artist-photos/moderator-artist-photos.component';
import { ModeratorMoviePhotosComponent } from './moderator-movie-photos/moderator-movie-photos.component';
import { ModeratorMovieRoleActivityComponent } from './moderator-movie-role-activity/moderator-movie-role-activity.component';
import { ModeratorArtistDeleteComponent } from './moderator-artist-delete/moderator-artist-delete.component';
import { ModeratorMovieDeleteComponent } from './moderator-movie-delete/moderator-movie-delete.component';
import { ModeratorMovieRoleDeleteComponent } from './moderator-movie-role-delete/moderator-movie-role-delete.component';
import { ModeratorPhotoDeleteComponent } from './moderator-photo-delete/moderator-photo-delete.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { moderatorRoutes } from './moderator.routes';



@NgModule({
  declarations: [
    ModeratorMainComponent,
    ModeratorMovieComponent,
    ModeratorMovieActivityComponent,
    ModeratorArtistComponent,
    ModeratorArtistActivityComponent,
    ModeratorMovieRoleComponent,
    ModeratorArtistPhotosComponent,
    ModeratorMoviePhotosComponent,
    ModeratorMovieRoleActivityComponent,
    ModeratorArtistDeleteComponent,
    ModeratorMovieDeleteComponent,
    ModeratorMovieRoleDeleteComponent,
    ModeratorPhotoDeleteComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(moderatorRoutes)
  ], exports: [
  ]
})
export class ModeratorModule { }
