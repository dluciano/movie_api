<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ year }}</div>
    <div>{{ imdbID }}</div>
    {{}}
  </div>
</template>

<script   lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MoviePanel",
  props: {
    title: String,
    year: Number,
    imdbID: String,
  },
});
</script>
