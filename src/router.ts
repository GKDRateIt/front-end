import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "./components/home_page/HomePage.vue";
import AboutPage from "./components/AboutPage.vue";
import LogIn from "./components/user/LogInPage.vue";
import Register from "./components/user/RegisterPage.vue";
import MyReviews from "./components/user/MyReviews.vue";
import AllCourses from "./components/course/AllCourses.vue";
import CourseMutipleTeachers from "./components/course/CourseMultipleTeachers.vue";
import SearchResult from "./components/search/SearchResult.vue";
import NewCourse from "./components/course/NewCourse.vue";
import NewReview from "./components/review/NewReview.vue";
import RecentReview from "./components/review/RecentReview.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LogIn },
  { path: "/register", component: Register },
  { path: "/profile", component: MyReviews },
  { path: "/profile/my-reviews", component: MyReviews },
  { path: "/courses", component: AllCourses },
  { path: "/course", component: CourseMutipleTeachers },
  { path: "/recent-review", component: RecentReview },
  { path: "/search", component: SearchResult },
  { path: "/new-course", component: NewCourse },
  { path: "/new-review", component: NewReview },
  { path: "/about", component: AboutPage },
  { path: "/courses/:cat_id", name: "courseCategory", component: AllCourses },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
