import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
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
