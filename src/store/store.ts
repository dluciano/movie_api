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
    async loadMoviesAsync() {
      this.favMovies = await favMoviesRepo.getAll();
    },
  },
});
