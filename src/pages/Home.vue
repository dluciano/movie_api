<template>
  <div class="my-3">
    <input
      type="search"
      v-model="searchValue"
      placeholder="To start search type the name of a movie..."
      class="
        from-gray-700
        mb-3
        border border-black
        rounded
        w-full
        h-10
        px-2
        text-blue-400
        outline-none
      "
    />
    <div class="grid grid-cols-4 gap-4">
      <router-link
        :to="{ name: 'Movie', params: { imdbId: movie.imdbID } }"
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
      <a v-on:click="goToFirstPage()" class="ml-1">&lt;&lt;</a>
      <a v-on:click="previousPage()">&lt;</a>
      <div class="" v-for="index in pagesIndexes" :key="index">
        <a
          v-on:click="goToPage(index)"
          class="ml-1"
          :class="[currentPage === index ? 'underline' : '']"
          >{{ index }}</a
        >
      </div>
      <a v-on:click="nextPage()" class="ml-1">&gt;</a>
      <a v-on:click="goToLastPage()" class="ml-1">&gt;&gt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { MovieListPage } from "@/api/Models/MovieListPage";
import { searchMovies } from "../api/MoviesApi";
export default defineComponent({
  name: "MovieList",
  data() {
    return {
      currentPage: 1,
      pagesIndexes: Array<number>(),
      movies: {},
      searchValue: "",
    } as {
      currentPage: number;
      pagesIndexes: number[];
      movies: MovieListPage;
      searchValue: string;
    };
  },
  watch: {
    searchValue: async function () {
      this.currentPage = 1;
      this.search();
    },
  },
  async mounted() {
    this.search();
  },
  methods: {
    async goToFirstPage() {
      this.currentPage = 1;
      await this.search();
    },
    async goToLastPage() {
      this.currentPage = this.movies.total_pages;
      await this.search();
    },
    async previousPage() {
      const nextPage = this.currentPage - 1;
      if (nextPage <= 0 || nextPage > this.movies.total_pages) return;
      this.currentPage = nextPage;
      await this.search();
    },
    async nextPage() {
      const nextPage = this.currentPage + 1;
      if (nextPage <= 0 || nextPage > this.movies.total_pages) return;
      this.currentPage = nextPage;
      await this.search();
    },
    async goToPage(pageIndex: number) {
      if (pageIndex <= 0 || pageIndex > this.movies.total_pages) return;
      this.currentPage = pageIndex;
      await this.search();
    },
    async search() {
      this.movies = await searchMovies(this.searchValue, this.currentPage);
      this.pagesIndexes = [];
      const initialPageIndex =
        this.currentPage + 10 <= this.movies.total_pages
          ? this.currentPage
          : this.movies.total_pages - 10;
      for (
        let i = initialPageIndex;
        i <= this.movies.total_pages && i <= this.currentPage + 10;
        i++
      ) {
        if (i <= 0 || i > this.movies.total_pages) continue;
        this.pagesIndexes.push(i);
      }
    },
  },
});
</script>

<style>
</style>