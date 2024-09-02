import axios from 'axios'
import { API_V1_URL } from '@/config'
import { errorInterceptor, successInterceptor } from './interceptors'

import type { AvailablePlaceRow, Movie, MovieShows, TicketData } from '@/stores/root'

const request = axios.create({ baseURL: API_V1_URL })
request.interceptors.response.use(successInterceptor, errorInterceptor)

export type GetMoviesPayload = {
  movie_id?: number;
  name?: string;
  genres?: number[];
};

export type GetMovieShows = {
  movie_id?: number;
};

export type GetAvailablePlacesPayload = {
  movie_id: number;
  daytime: string;
  showdate: string;
};

export type BookPlacePayload = {
  movie_id: number;
  row: number;
  seat: number;
  daytime: string;
  showdate: string;
};

export default {
  getMovies: (params: GetMoviesPayload) => request.get<Movie[]>('/movies', { params }),
  getMovieShows: (params: GetMovieShows) => request.get<MovieShows>('/movieShows', { params }),
  getAvailablePlaces: (params: GetAvailablePlacesPayload) =>
    request.get<AvailablePlaceRow[]>('/showPlaces', { params }),
  bookPlace: (payload: BookPlacePayload) => request.post<TicketData>('/bookPlace', payload),
}
