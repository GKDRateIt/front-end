import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogInPage.vue";
import Register from "./components/RegisterPage.vue";
import CoursesPage from "./components/CoursesPage.vue";
import SingleCoursePage from "./components/SingleCoursePage.vue";
import SearchResult from "./components/SearchResult.vue";
import NewCourse from "./components/NewCourse.vue";
import NewReviewPage from "./components/NewReviewPage.vue";
import RecentReviewPage from "./components/RecentReviewPage.vue";
import AboutPage from "./components/AboutPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LogIn },
  { path: "/register", component: Register },
  { path: "/courses", component: CoursesPage },
  { path: "/course", component: SingleCoursePage },
  { path: "/recent-review", component: RecentReviewPage },
  { path: "/search", component: SearchResult },
  { path: "/new-course", component: NewCourse },
  { path: "/new-review", component: NewReviewPage },
  { path: "/about", component: AboutPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
