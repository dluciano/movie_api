<template>
  <div class="container mx-auto">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/fav">Favorites</router-link>
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

