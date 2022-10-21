import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/home_page/HomePage.vue";
import AboutPage from "./components/AboutPage.vue";
import LogIn from "./components/user/LogInPage.vue";
import Register from "./components/user/RegisterPage.vue";
import CoursesPage from "./components/course/CoursesPage.vue";
import SingleCoursePage from "./components/course/SingleCoursePage.vue";
import SearchResult from "./components/search/SearchResult.vue";
import NewCourse from "./components/course/NewCourse.vue";
import NewReviewPage from "./components/review/NewReviewPage.vue";
import RecentReviewPage from "./components/review/RecentReviewPage.vue";

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
