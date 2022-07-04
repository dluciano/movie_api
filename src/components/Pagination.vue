<template>
  <div class="flex justify-center items-center w-full">
    <a v-on:click="goToFirstPage()" class="ml-1">&lt;&lt;</a>
    <a v-on:click="goToPreviousPage()">&lt;</a>
    <div class="" v-for="index in pagesIndexes" :key="index">
      <a
        v-on:click="goToPage(index)"
        class="ml-1"
        :class="[currentPage === index ? 'underline' : '']"
        >{{ index }}
      </a>
    </div>
    <a v-on:click="goToNextPage()" class="ml-1">&gt;</a>
    <a v-on:click="goToLastPage()" class="ml-1">&gt;&gt;</a>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "layout",
  props: {
    currentPage: Number,
    totalNumberOfPages: Number,
  },
  setup(props) {
    const totalNumberOfPages = ref(props.totalNumberOfPages || 0) ;
    const currentPage = totalNumberOfPages === 0 ? 0 : props.currentPage || 1;

    const emit = defineEmits(["onPageChanged"]);
    const goToFirstPage = async () => {
      props.currentPage = 1;
      emit("onPageChanged", currentPage);
    };
    const goToLastPage = async () => {
      currentPage = totalNumberOfPages;
      emit("onPageChanged", currentPage);
    };
    const goToPreviousPage = async () => {
      const nextPage = currentPage.value - 1;
      if (nextPage <= 0 || nextPage > totalNumberOfPages) return;
      currentPage = nextPage;
      emit("onPageChanged", currentPage);
    };
    const goToNextPage = async () => {
      const nextPage = currentPage + 1;
      if (nextPage <= 0 || nextPage > totalNumberOfPages) return;
      currentPage = nextPage;
      emit("onPageChanged", currentPage);
    };
    const goToPage = async (pageIndex: number) => {
      if (pageIndex <= 0 || pageIndex > totalNumberOfPages) return;
      currentPage = pageIndex;
    };
    return {
      // Data
      currentPage,
      pagesIndexes,
      // Methods
      goToFirstPage,
      goToLastPage,
      goToPreviousPage,
      goToNextPage,
      goToPage,
    };
  },
});
</script>
