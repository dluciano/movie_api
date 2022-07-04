import type { Movie } from "@/api";
import { defineStore } from "pinia";
import { favMoviesRepo } from "@/db";

interface RootState {
  favMovies: Movie[];
}

const initialState: RootState = {
  favMovies: [],
};

export const useMovieStore = defineStore("main", {
  state: () => initialState,
  actions: {
    async loadFavMoviesAsync() {
      this.favMovies = await favMoviesRepo.getAll();
    },
    async addFavMovieAsync(movie: Movie) {
      if (this.favMovies.find((m) => m.imdbID === movie.imdbID)) return;
      this.favMovies = [...this.favMovies, movie];
    },
    async removeFavMovieAsync(imdbID: string) {
      this.favMovies = [
        ...this.favMovies.filter((m) => m.imdbID !== imdbID),
      ];
    },
  },
});
