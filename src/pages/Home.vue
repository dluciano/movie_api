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
    <Pagination
      :currentPage="currentPage"
      :firstPage="1"
      :lastPage="movies.total_pages"
      :numberOfDisplayedPages="10"
      @onChange="onPageChanged"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { MovieListPage } from "@/api/Models/MovieListPage";
import { searchMovies } from "../api/MoviesApi";
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "@/store";
import MoviePanel from "@/components/MoviePanel.vue";
import Pagination from "@/components/Pagination.vue";

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
    Pagination,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useMovieStore();
    const { loadFavMoviesAsync } = store;

    const currentPage = ref<number>(1);
    const movies = ref<MovieListPage>(initialMoviePage);
    const searchValue = ref("");
    const moviesSet = new Set<string>();

    const syncFavMovies = async () => {
      await loadFavMoviesAsync();
      moviesSet.clear();
      for (const m of store.favMovies) moviesSet.add(m.imdbID);
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
    };

    const loadPage = async () => {
      await search();
      await syncFavMovies();
    };

    // Methods
    const onPageChanged = async (page: number) => {
      currentPage.value = page;
      await updateRouting();
      await search();
      await syncFavMovies();
    };

    const isFav = (imdbID: string) => moviesSet.has(imdbID);

    // Watch
    watch(
      () => route.query,
      async () => {
        await loadPage();
      }
    );

    // Before create
    readRoutingValues();
    await loadPage();

    return {
      // Data
      currentPage,
      movies,
      searchValue,
      // Methods
      onPageChanged,
      search,
      isFav,
    };
  },
});
</script>

<style>
</style>