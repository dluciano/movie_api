<template>
  <div>
    <h1>Favorites</h1>
    <div v-for="movie in store.favMovies" :key="movie.imdbID">
      <MoviePanel
        :title="movie.Title"
        :imdbID="movie.imdbID"
        :year="movie.Year"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useMovieStore } from "@/store";
import { defineComponent } from "vue";
import MoviePanel from "@/components/MoviePanel.vue";
export default defineComponent({
  components:{
    MoviePanel
  },
  async setup() {
    const store = useMovieStore();
    await store.loadFavMoviesAsync();
    return {
      store,
    };
  },
});
</script>
