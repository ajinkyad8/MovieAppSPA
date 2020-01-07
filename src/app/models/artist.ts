import { MovieRole } from './movieRole';
import { ArtistPhoto } from './artistPhoto';

export interface Artist {
    id: number;
    firstName: string;
    lastName: string;
    knownAs: string;
    dateOfBirth: Date;
    gender: string;
    isApproved: boolean;
    movieRoles: MovieRole[];
    photoUrl: string;
    artistPhotos: ArtistPhoto[];
}
