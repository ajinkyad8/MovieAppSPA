import { Artist } from './artist';
import { Photo } from './photo';

export interface ArtistPhoto {
    artist: Artist;
    artistId: number;
    photo: Photo;
    photoId: number;
}
