<template>
  <div class="container mx-auto">
    <div id="nav">
      <router-link to="/" v-slot="{ isActive, isExactActive }">
        <p
        class="inline-block mr-3"
          :class="[
            isActive && 'underline',
            isExactActive && 'underline',
          ]"
        >
          Home
        </p>
      </router-link>
      
      <router-link to="/fav" v-slot="{ isActive, isExactActive }">
        <p
        class="inline-block"
          :class="[
            isActive && 'underline',
            isExactActive && 'underline',
          ]"
        >
          Favorites
        </p></router-link>
    </div>
    <router-view v-slot="{ Component, route }">
      <suspense>
        <template #default>
          <div>
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
              view-prop="value"
            />
          </div>
        </template>
        <template #fallback><div>Loading...</div> </template>
      </suspense>
    </router-view>
  </div>
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
