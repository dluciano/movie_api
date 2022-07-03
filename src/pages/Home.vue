<template>
  <div class="my-3">
    <div class="grid grid-cols-4 gap-4">
      <router-link
        :to="{ name: 'Movie', params: {imdbId: movie.imdbID} }"
        v-for="movie in movies.data"
        :key="movie.imdbID"
        class="
          inline-block
          p-6
          max-w-sm
          bg-white
          rounded-lg
          border border-gray-200
          shadow-md
          hover:bg-gray-100
          dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
        "
      >
        <div>{{ movie.Title }}</div>
        <div>{{ movie.Year }}</div>
        <div>{{ movie.imdbID }}</div>
      </router-link>
    </div>

    <div class="flex justify-center items-center w-full">
      <a v-on:click="goToPage(1)" class="ml-1">&lt;&lt;</a>
      <a v-on:click="goToPage(currentPage - 1)">&lt;</a>
      <div class="" v-for="index in pagesIndexes" :key="index">
        <a v-on:click="goToPage(index)" class="ml-1">{{ index }}</a>
      </div>
      <a v-on:click="goToPage(currentPage + 1)" class="ml-1">&gt;</a>
      <a v-on:click="goToPage(movies.total_pages)" class="ml-1">&gt;&gt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { MovieListPage } from "@/api/Models/MovieListPage";
import { listMovies } from "../api/MoviesApi";
export default defineComponent({
  name: "MovieList",
  async mounted() {
    this.goToPage(1);
  },
  data() {
    return {
      currentPage: 1,
      pagesIndexes: Array<number>(),
      movies: {},
    } as {
      currentPage: number;
      pagesIndexes: number[];
      movies: MovieListPage;
    };
  },
  computed: {
    isFirstPage() {
      this.currentPage === 1;
    },
  },
  methods: {
    async goToPage(pageIndex: number) {
      if (pageIndex === 0 || pageIndex === this.movies.total_pages + 1) return;
      this.currentPage = pageIndex;
      this.movies = await listMovies(pageIndex);
      this.pagesIndexes = [];
      for (
        var i =
          this.currentPage + 10 <= this.movies.total_pages
            ? this.currentPage
            : this.movies.total_pages - 10;
        i < this.movies.total_pages && i < this.currentPage + 10;
        i++
      ) {
        this.pagesIndexes.push(i);
      }
    },
  },
});
</script>

<style>
</style>