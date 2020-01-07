import { Movie } from './movie';
import { Photo } from './photo';

export interface MoviePhoto {
    movie: Movie;
    movieId: number;
    photo: Photo;
    photoId: number;
}