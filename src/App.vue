<template>
  <div class="container mx-auto">
    <header id="nav">
      <router-link to="/" v-slot="{ isActive, isExactActive }">
        <p
          class="inline-block mr-3"
          :class="[isActive && 'underline', isExactActive && 'underline']"
        >
          Home
        </p>
      </router-link>

      <router-link to="/fav" v-slot="{ isActive, isExactActive }">
        <p
          class="inline-block"
          :class="[isActive && 'underline', isExactActive && 'underline']"
        >
          Favorites
        </p></router-link
      >
    </header>
    <router-view v-slot="{ Component, route }">
      <suspense>
        <template #default>
          <main class="container">
            <h1 class="font-bold text-2xl mb-0">IMDB Movies Searcher</h1>
            <p class="font-light">
              List of movies registered in IMDB. Search your loved movies and
              then add it as favorite
            </p>
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
              view-prop="value"
            />
          </main>
        </template>
        <template #fallback><div>Loading...</div> </template>
      </suspense>
    </router-view>
  </div>
  <footer class="w-full text-center bottom-0 absolute mb-3">Dawlin&copy; 2022</footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMovieStore } from "@/store";
import { favMoviesRepo } from "@/db";

export default defineComponent({
  setup() {
    const store = useMovieStore();
    store.$subscribe(async (_, state) => {
      await favMoviesRepo.sync(state.favMovies);
    });
  },
});
</script>
