<template>
  <div>
    <p v-if="store.favMovies.length === 0">No favorites added yet!</p>
    <div v-for="movie in store.favMovies" :key="movie.imdbID">
      <MoviePanel
        :title="movie.Title"
        :imdbID="movie.imdbID"
        :year="movie.Year"
        :isChecked="true"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { useMovieStore } from "@/store";
import { defineComponent } from "vue";
import MoviePanel from "@/components/MoviePanel.vue";
export default defineComponent({
  components: {
    MoviePanel,
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
