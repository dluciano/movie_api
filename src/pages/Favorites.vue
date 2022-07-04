<template>
  <div>
    <h1>Favorites</h1>
    <div v-for="movie in store.favMovies" :key="movie.imdbID">
      <p>{{ movie.Title }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { useMovieStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const store  = useMovieStore();
    await store.loadMoviesAsync();
    return {
      store,
    };
  },
});
</script>
