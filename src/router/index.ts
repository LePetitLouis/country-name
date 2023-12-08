import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
import Country from "@/views/Country.vue";
import Capital from "@/views/Capital.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/country",
    name: "Country",
    component: Country,
  },
  {
    path: "/capital",
    name: "Capital",
    component: Capital,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
