import MainBody from "./components/MainBody.vue"
import Courses from "./components/Courses.vue"
import Teachers from "./components/Teachers.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/", component: MainBody },
    { path: "/courses", component: Courses },
    { path: "/teachers", component: Teachers },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;