import MainBody from "./components/MainBody.vue"
import Courses from "./components/Courses.vue"
import Teachers from "./components/Teachers.vue"
import SingleCourse from "./components/SingleCourse.vue"
import SingleTeacher from "./components/SingleTeacher.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", component: MainBody },
    { path: "/courses", component: Courses },
    { path: "/courses/:courseId", component: SingleCourse },
    { path: "/teachers", component: Teachers },
    { path: "/teachers/:teacherId", component: SingleTeacher },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;