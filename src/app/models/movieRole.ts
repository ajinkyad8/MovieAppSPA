import { Artist } from './artist';
import { Movie } from './movie';
import { RoleType } from './roleType';

export interface MovieRole {
    id: number;
    movieId: number;
    artistId: number;
    roleTypeId: number;
    artist: Artist;
    movie: Movie;
    roleType: RoleType;
    roleDescription: string;
    isApproved: boolean;
}
