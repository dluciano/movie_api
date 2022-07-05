<template>
  <div class="flex justify-center items-center w-full">
    <a @click="goToPage(firstPage)" class="ml-1">&lt;&lt;</a>
    <a @click="goToPage(currentPage - 1)">&lt;</a>
    <div class="" v-for="index in pagesIndexes" :key="index">
      <a
        @click="goToPage(index)"
        class="ml-1"
        :class="[currentPage === index ? 'underline' : '']"
        >{{ index }}
      </a>
    </div>
    <a @click="goToPage(currentPage + 1)" class="ml-1">&gt;</a>
    <a @click="goToPage(lastPage)" class="ml-1">&gt;&gt;</a>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    firstPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
    numberOfDisplayedPages: {
      type: Number,
      required: true,
    },
  },
  emits: {
    onChange: (page: number) => true,
  },
  setup(props, { emit }) {
    const pagesIndexes = ref<number[]>([]);

    const loadPages = () => {
      let i = props.currentPage - 5;
      let count = 0;
      pagesIndexes.value = [];
      while (
        count < (props.numberOfDisplayedPages || 0) &&
        i <= props.lastPage
      ) {
        if (i < props.firstPage) {
          i++;
          continue;
        }
        pagesIndexes.value.push(i);
        count++;
        i++;
      }
    };

    const goToPage = (page: number) => {
      if (page < props.firstPage || page > props.lastPage) return;
      emit("onChange", page);
    };

    watch(() => [props.lastPage, props.currentPage], loadPages);

    loadPages();

    return {
      // Data
      pagesIndexes,
      // Methods
      goToPage,
    };
  },
});
</script>
