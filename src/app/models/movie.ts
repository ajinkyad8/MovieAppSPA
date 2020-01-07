import { MovieRole } from './movieRole';
import { MoviePhoto } from './moviePhoto';

export interface Movie {
    id: number;
    name: string;
    releaseDate: Date;
    language: string;
    genre: string;
    country: string;
    runtime: number;
    plotSummary: string;
    isApproved: boolean;
    movieRoles: MovieRole[];
    photoUrl: string;
    moviePhotos: MoviePhoto[];
}
