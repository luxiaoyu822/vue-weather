import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    redirect: "home",
  },
  {
    path: "/:any",
    redirect: "home",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
