<template>
  <div
    class="
      inline-block
      p-3
      w-full
      h-full
      bg-white
      rounded-lg
      border border-gray-200
      shadow-md
      hover:bg-gray-100
      dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700
    "
  >
    <article>
      <h1 class="font-black inline-block w-64">{{ title }}</h1>
      <p class="inline-block float-right">#{{ imdbID }}</p>
      <p>{{ year }}</p>
    </article>
    <div class="float-right">
      <input
        type="checkbox"
        @change="(e) => onFavMovieChanged(e, { title, year, imdbID })"
        :checked="isChecked"
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
    isChecked: Boolean,
  },
  setup() {
    const { addFavMovieAsync, removeFavMovieAsync } = useMovieStore();

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

    return {
      onFavMovieChanged,
    };
  },
});
</script>
