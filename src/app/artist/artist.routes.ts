import { Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { AuthenticationGuard } from '../helpers/authentication.guard';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';

export const artistRoutes: Routes = [

    {path: '', component: ArtistListComponent},
    {path: 'edit', component: ArtistEditComponent, canActivate: [AuthenticationGuard], data : {role : ['Admin', 'Moderator', 'User']}},
    {path: 'detail', component: ArtistDetailComponent},
];
