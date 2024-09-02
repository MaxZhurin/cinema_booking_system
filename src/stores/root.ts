import { defineStore } from 'pinia'
import rootService from '@/services/root'
import { useToast } from 'vue-toastification'

import type {
  BookPlacePayload,
  GetAvailablePlacesPayload,
  GetMovieShows,
  GetMoviesPayload,
} from '@/services/root'

export type Place = {
  row: number;
  seat: number;
};

export enum Genres {
  ACTION,
  ADVENTURES,
  COMEDY,
  DRAMA,
  HORROR,
  WESTERNS,
}

type GenresKeys = keyof typeof Genres;

export type Movie = {
  id: number;
  name: string;
  description: string;
  genre: (typeof Genres)[GenresKeys];
  image: string;
  additional: string;
};

export type AvailablePlaceRow = [
  { row: number },
  Array<{
    seat: number;
    is_free: boolean;
  }>
];

type MovieShowData = {
  showdate: string;
  daytime: string;
};

export type MovieShows = {
  [key: number]: MovieShowData[];
};

export type TicketData = {
  movie_id: number;
  row: number;
  seat: number;
  daytime: string;
  showdate: string;
  ticketkey: string;
};

interface RootStore {
  moviesLoading: boolean;
  movies: Movie[];
  availablePlaces: AvailablePlaceRow[];
  movieShowsLoading: boolean;
  movieShows: MovieShows;
}

const toast = useToast()

export const useRootStore = defineStore('root', {
  state: (): RootStore => ({
    moviesLoading: false,
    movies: [],
    availablePlaces: [],
    movieShowsLoading: false,
    movieShows: {},
  }),
  actions: {
    async getMovies (params: GetMoviesPayload = {}) {
      try {
        this.moviesLoading = true
        const { data } = await rootService.getMovies(params)

        if (params?.movie_id) {
          const index = this.movies.findIndex(
            item => item.id === params.movie_id
          )
          if (index === -1) this.movies = [...this.movies, ...data]
        } else {
          this.movies = data
        }
      } catch (error) {
        toast.error('Помилка отримання фільмів!')
      } finally {
        this.moviesLoading = false
      }
    },
    getMovieShows (params: GetMovieShows = {}) {
      this.movieShowsLoading = true

      return rootService
        .getMovieShows(params)
        .then(({ data }) => {
          this.movieShows = { ...this.movieShows, ...data }
        })
        .catch(() => {
          toast.error('Помилка отримання сессій!')
        })
        .finally(() => {
          this.movieShowsLoading = false
        })
    },
    getAvailablePlaces (params: GetAvailablePlacesPayload) {
      return rootService.getAvailablePlaces(params)
    },
    bookPlace (payload: BookPlacePayload) {
      return rootService.bookPlace(payload)
    },
  },
})
