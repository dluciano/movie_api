<template>
  <div>
    <p v-if="store.favMovies.length === 0">No favorites added yet!</p>
    <n-space vertical>
      <MoviePanel
        v-for="movie in store.favMovies"
        :key="movie.imdbID"
        :title="movie.Title"
        :imdbID="movie.imdbID"
        :year="movie.Year"
        :isChecked="true"
      />
    </n-space>
  </div>
</template>

<script lang="ts">
import { useMovieStore } from "@/store";
import { defineComponent } from "vue";
import MoviePanel from "@/components/MoviePanel.vue";
import { NSpace } from "naive-ui";

export default defineComponent({
  components: {
    MoviePanel,
    NSpace,
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
