<template>
  <div class="my-3">
    <input
      type="search"
      v-model="searchValue"
      placeholder="Type the name of a movie to start searching..."
      class="
        from-gray-700
        mb-3
        max-w-sm
        border border-black
        rounded
        w-full
        h-10
        px-2
        text-blue-400
        outline-none
      "
    />
    <p v-if="movies.data.length > 0">{{ movies.total }} movies found</p>
    <p v-if="movies.data.length === 0">{{ movies.total }} No movies found</p>
    <div class="grid grid-cols-4">
      <div v-for="movie in movies.data" :key="movie.imdbID" class="p-3">
        <MoviePanel
          :title="movie.Title"
          :imdbID="movie.imdbID"
          :year="movie.Year"
          :isChecked="isFav(movie.imdbID)"
        />
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
          >{{ index }}
        </a>
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
import { useMovieStore } from "@/store";
import MoviePanel from "@/components/MoviePanel.vue";

const initialMoviePage: MovieListPage = {
  data: [],
  page: 1,
  per_page: 0,
  total: 0,
  total_pages: 0,
};

export default defineComponent({
  name: "MovieList",
  components: {
    MoviePanel,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useMovieStore();
    const { loadFavMoviesAsync } = store;

    const currentPage = ref<number>(1);
    const pagesIndexes = ref<number[]>([]);
    const movies = ref<MovieListPage>(initialMoviePage);
    const searchValue = ref("");
    const initialFavMovieImdbIDs = new Set<string>();

    const syncFavMovies = async () => {
      await loadFavMoviesAsync();
      initialFavMovieImdbIDs.clear();
      for (const m of store.favMovies) initialFavMovieImdbIDs.add(m.imdbID);
    };

    const updatePagination = (itemsPerPage: number = 10) => {
      pagesIndexes.value = [];
      const initialPageIndex =
        currentPage.value + itemsPerPage <= movies.value.total_pages
          ? currentPage.value
          : movies.value.total_pages - itemsPerPage;
      for (
        let i = initialPageIndex;
        i <= movies.value.total_pages && i <= currentPage.value + itemsPerPage;
        i++
      ) {
        if (i <= 0 || i > movies.value.total_pages) continue;
        pagesIndexes.value.push(i);
      }
    };

    const search = async () => {
      movies.value = await searchMovies(searchValue.value, currentPage.value);
    };

    const readRoutingValues = () => {
      const { title, page } = route.query;

      currentPage.value =
        page && parseInt(page.valueOf().toString()) > 1
          ? parseInt(page.valueOf().toString())
          : 1;
      searchValue.value = title ? title.valueOf().toString() : "";
    };

    const loadPage = async () => {
      await search();
      await syncFavMovies();
      updatePagination();
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

    // Methods
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
    const isFav = (imdbID: string) => initialFavMovieImdbIDs.has(imdbID);

    // Watch
    watch(
      () => searchValue.value,
      async () => {
        currentPage.value = 1;
        await updateRouting();
      }
    );
    watch(() => currentPage.value, updateRouting);

    watch(
      () => route.query,
      async () => {
        readRoutingValues();
        await loadPage();
      }
    );

    // Before create
    readRoutingValues();
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
      isFav,
    };
  },
});
</script>

<style>
</style>