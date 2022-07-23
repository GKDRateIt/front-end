import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogInPage.vue";
import CoursePage from "./components/CoursePage.vue";
import SearchResult from "./components/SearchResult.vue";
import NewCourse from "./components/NewCourse.vue";
import NewReview from "./components/NewReview.vue";
import AboutPage from "./components/AboutPage.vue";
import FeedbackPage from "./components/FeedbackPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/log-in", component: LogIn },
  { path: "/course", component: CoursePage },
  { path: "/search", component: SearchResult },
  { path: "/new-course", component: NewCourse },
  { path: "/new-review", component: NewReview },
  { path: "/about", component: AboutPage },
  { path: "/feedback", component: FeedbackPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
