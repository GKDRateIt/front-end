import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogIn.vue";
import CoursePage from "./components/CoursePage.vue";
import SearchResult from "./components/SearchResult.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/log-in", component: LogIn },
  { path: "/course", component: CoursePage },
  { path: "/search", component: SearchResult },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
