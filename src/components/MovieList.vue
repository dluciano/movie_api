<template>  
  <div v-for="movie in movies.data" :key="movie.imdbID">
    <div>{{movie.Title}}</div>
    <div>{{movie.Year}}</div>
    <div>{{movie.imdbID}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { MovieListPage } from "@/api/Models/MovieListPage";
import { listMovies } from "../api/MoviesApi";
export default defineComponent({
  name: "MovieList",
  async mounted() {
    this.movies = await listMovies(this.currentPage);
  },
  data() {
    return {
      currentPage: 1,
      movies: {},
    } as {
      currentPage: number;
      movies: MovieListPage;
    };
  },
});
</script>

<style>
</style>