<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header style="padding: 24px 24px 0 24px">
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
          <h1 class="font-bold text-2xl mb-0">IMDB Movies Searcher</h1>
          <p class="font-light">
            List of movies registered in IMDB. Search your loved movies and then
            add it as favorite
          </p>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
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
        </n-layout-content>
        <n-layout-footer>Dawlin&copy; 2022</n-layout-footer>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMovieStore } from "@/store";
import { favMoviesRepo } from "@/db";
import {
  NConfigProvider,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
} from "naive-ui";

export default defineComponent({
  components: {
    NConfigProvider,
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
  },
  setup() {
    const store = useMovieStore();
    store.$subscribe(async (_, state) => {
      await favMoviesRepo.sync(state.favMovies);
    });
  },
});
</script>
