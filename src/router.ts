import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/log-in", component: LogIn },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
