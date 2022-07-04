<template>
  <div
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
    <div>
      <div>{{ title }}</div>
      <div>{{ year }}</div>
      <div>{{ imdbID }}</div>
    </div>
    <div>
      <input
        type="checkbox"
        @change="(e) => onFavMovieChanged(e, { title, year, imdbID })"
        :checked="() => isFav(imdbID)"
      />
      Add to favorites
    </div>
  </div>
</template>

<script lang="ts">
import type { Movie } from "@/api";
import { useMovieStore } from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoviePanel",
  props: {
    title: String,
    year: Number,
    imdbID: String,
  },
  setup() {
    const store = useMovieStore();
    const { addFavMovieAsync, removeFavMovieAsync } = store;
    const favMovieImdbIDsSet = new Set<string>();

    const onFavMovieChanged = (
      e: Event,
      {
        title,
        year,
        imdbID,
      }: { title?: string; year?: number; imdbID?: string }
    ) => {
      if (!title || !year || !imdbID) return;
      const { checked } = e.target as HTMLInputElement;
      const movie: Movie = {
        Title: title,
        Year: year,
        imdbID: imdbID,
      };
      if (checked) {
        addFavMovieAsync(movie);
        return;
      }
      removeFavMovieAsync(movie.imdbID);
    };

    const isFav = (imdbID?: string) => {
      if (!imdbID) return false;
      return favMovieImdbIDsSet.has(imdbID);
    };
    return {
      onFavMovieChanged,
      isFav,
    };
  },
});
</script>
