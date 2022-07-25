import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LogIn from "./components/LogInPage.vue";
import CoursesPage from "./components/CoursesPage.vue";
import SingleCoursePage from "./components/SingleCoursePage.vue";
import SearchResult from "./components/SearchResult.vue";
import NewCourse from "./components/NewCourse.vue";
import NewReview from "./components/NewReview.vue";
import AboutPage from "./components/AboutPage.vue";
import FeedbackPage from "./components/FeedbackPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/log-in", component: LogIn },
  { path: "/course", component: CoursesPage },
  { path: "/courses", component: CoursesPage },
  { path: "/course/:courseId", component: SingleCoursePage },
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
