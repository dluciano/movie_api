<template>
  <n-card :title="title" size="small">
    <n-text depth="3">#{{ imdbID }}</n-text>
    <n-h6>{{ year }}</n-h6>
    <n-switch
      :value="isFavorite"
      @update-value="() => onFavMovieChanged({ title, year, imdbID })"
    />
    Add to favorites
  </n-card>
</template>

<script lang="ts">
import type { Movie } from "@/api";
import { useMovieStore } from "@/store";
import { defineComponent, ref } from "vue";
import { NCard, NH6, NText, NSwitch } from "naive-ui";

export default defineComponent({
  name: "MoviePanel",
  components: {
    NCard,
    NH6,
    NText,
    NSwitch,
  },
  props: {
    title: String,
    year: Number,
    imdbID: String,
    isChecked: Boolean,
  },
  setup(props) {
    const { addFavMovieAsync, removeFavMovieAsync } = useMovieStore();
    const isFavorite = ref(props.isChecked);
    const onFavMovieChanged = async ({
      title,
      year,
      imdbID,
    }: {
      title?: string;
      year?: number;
      imdbID?: string;
    }) => {
      isFavorite.value = !isFavorite.value;
      if (!title || !year || !imdbID) throw new Error("invalid values in card");
      const movie: Movie = {
        Title: title,
        Year: year,
        imdbID: imdbID,
      };

      if (isFavorite.value) {
        await addFavMovieAsync(movie);
        return;
      }
      await removeFavMovieAsync(movie.imdbID);
    };

    return {
      onFavMovieChanged,
      isFavorite,
    };
  },
});
</script>
