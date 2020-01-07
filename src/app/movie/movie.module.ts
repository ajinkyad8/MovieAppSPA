import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieArtistCardComponent } from './movie-artist-card/movie-artist-card.component';
import { MovieEditCardDeckComponent } from './movie-edit-card-deck/movie-edit-card-deck.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieDetailCardDeckComponent } from './movie-detail-card-deck/movie-detail-card-deck.component';
import { MovieEditMovieRoleComponent } from './movie-edit-movie-role/movie-edit-movie-role.component';
import { MovieEditPhotoComponent } from './movie-edit-photo/movie-edit-photo.component';
import { RouterModule } from '@angular/router';
import { movieRoutes } from './movie.routes';



@NgModule({
  declarations: [
    MovieListComponent,
    MovieCardComponent,
    MovieEditComponent,
    MovieArtistCardComponent,
    MovieEditCardDeckComponent,
    MovieDetailComponent,
    MovieDetailCardDeckComponent,
    MovieEditMovieRoleComponent,
    MovieEditPhotoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(movieRoutes),
  ], exports: [
  ], entryComponents: [MovieEditMovieRoleComponent]
})
export class MovieModule { }
