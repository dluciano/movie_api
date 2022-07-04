import type { RouteRecordRaw } from "vue-router";
import { createWebHistory, createRouter } from "vue-router";
import Favorites from "@/pages/Favorites.vue";
import NotFound from "@/pages/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/fav",
    name: "Favorites",
    component: Favorites,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
