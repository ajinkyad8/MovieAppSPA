import { NgModule } from '@angular/core';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistCardDeckComponent } from './artist-card-deck/artist-card-deck.component';
import { ArtistEditPhotoComponent } from './artist-edit-photo/artist-edit-photo.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { artistRoutes } from './artist.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(artistRoutes),
  ],
  declarations: [
    ArtistListComponent,
    ArtistCardComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    ArtistCardDeckComponent,
    ArtistEditPhotoComponent], exports : [
      RouterModule
    ]
})
export class ArtistModule { }
