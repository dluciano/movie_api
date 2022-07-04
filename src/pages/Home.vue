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
    <p>{{ movies.total }} movies found</p>
    <div class="grid grid-cols-4 gap-4">
      <div
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
        <router-link :to="{ name: 'Movie', params: { imdbId: movie.imdbID } }">
          <div>{{ movie.Title }}</div>
          <div>{{ movie.Year }}</div>
          <div>{{ movie.imdbID }}</div>
        </router-link>
        <div>
          <input
            type="checkbox"
            @change="favChanged(movie)"
            :checked="isFav(movie.imdbID)"
          />
          Add to favorites
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center w-full">
      <a v-on:click="goToFirstPage()" class="ml-1">&lt;&lt;</a>
      <a v-on:click="goToPreviousPage()">&lt;</a>
      <div class="" v-for="index in pagesIndexes" :key="index">
        <a
          v-on:click="goToPage(index)"
          class="ml-1"
          :class="[currentPage === index ? 'underline' : '']"
          >{{ index }}</a
        >
      </div>
      <a v-on:click="goToNextPage()" class="ml-1">&gt;</a>
      <a v-on:click="goToLastPage()" class="ml-1">&gt;&gt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { MovieListPage } from "@/api/Models/MovieListPage";
import { searchMovies } from "../api/MoviesApi";
import { useRoute, useRouter } from "vue-router";
import type { Movie } from "@/api";
import { useMovieStore } from "@/store";

const initialMoviePage: MovieListPage = {
  data: [],
  page: 1,
  per_page: 0,
  total: 0,
  total_pages: 0,
};

export default defineComponent({
  name: "MovieList",
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useMovieStore();
    const { addFavMovieAsync, loadFavMoviesAsync } = store;

    const { title, page } = route.query;

    const currentPage = ref<number>(
      page && parseInt(page.valueOf().toString()) > 1
        ? parseInt(page.valueOf().toString())
        : 1
    );
    const pagesIndexes = ref<number[]>([]);
    const movies = ref<MovieListPage>(initialMoviePage);
    const searchValue = ref(title ? title.valueOf().toString() : "");
    const initialFavMovieImdbIDs = new Set<string>();

    const syncFavMovies = async () => {
      await loadFavMoviesAsync();
      initialFavMovieImdbIDs.clear();
      for (const m of store.favMovies) initialFavMovieImdbIDs.add(m.imdbID);
    };

    const isFav = (imdbID: string) => initialFavMovieImdbIDs.has(imdbID);
    
    const updatePagination = () => {
      pagesIndexes.value = [];
      const initialPageIndex =
        currentPage.value + 10 <= movies.value.total_pages
          ? currentPage.value
          : movies.value.total_pages - 10;
      for (
        let i = initialPageIndex;
        i <= movies.value.total_pages && i <= currentPage.value + 10;
        i++
      ) {
        if (i <= 0 || i > movies.value.total_pages) continue;
        pagesIndexes.value.push(i);
      }
    };

    const search = async () => {
      movies.value = await searchMovies(searchValue.value, currentPage.value);
    };

    const loadPage = async () => {
      await search();
      await syncFavMovies();
      updatePagination();
    };

    const goToFirstPage = async () => {
      currentPage.value = 1;
    };

    const goToLastPage = async () => {
      currentPage.value = movies.value.total_pages;
    };

    const goToPreviousPage = async () => {
      const nextPage = currentPage.value - 1;
      if (nextPage <= 0 || nextPage > movies.value.total_pages) return;
      currentPage.value = nextPage;
    };

    const goToNextPage = async () => {
      const nextPage = currentPage.value + 1;
      if (nextPage <= 0 || nextPage > movies.value.total_pages) return;
      currentPage.value = nextPage;
    };

    const goToPage = async (pageIndex: number) => {
      if (pageIndex <= 0 || pageIndex > movies.value.total_pages) return;
      currentPage.value = pageIndex;
    };

    const updateRouting = async () => {
      let query = {};

      if (searchValue.value) {
        query = {
          title: searchValue.value,
        };
      }

      if (currentPage.value > 1) {
        query = {
          ...query,
          page: currentPage.value,
        };
      }

      await router.push({
        path: "",
        query,
      });

      await loadPage();
    };

    const favChanged = (movie: Movie) => {
      addFavMovieAsync(movie);
    };

    watch(
      () => searchValue.value,
      async () => {
        currentPage.value = 1;
        await updateRouting();
      }
    );
    watch(() => currentPage.value, updateRouting);

    await loadPage();

    return {
      // Data
      currentPage,
      pagesIndexes,
      movies,
      searchValue,

      // Methods
      goToFirstPage,
      goToLastPage,
      goToPreviousPage,
      goToNextPage,
      goToPage,
      search,
      favChanged,
      isFav,
    };
  },
});
</script>

<style>
</style>