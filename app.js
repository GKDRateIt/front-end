import { header } from "./header.js";
import { entryPageComponent } from "./entry_page.js"
import { coursePageComponent } from "./course_page.js"
import { teacherPageComponent } from "./teacher_page.js"

const routes = [
    { path: "/", component: entryPageComponent },
    { path: "/courses", component: coursePageComponent },
    { path: "/teachers", component: teacherPageComponent },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

const mainBody = Vue.createApp({});

mainBody.use(router);
header.use(router);

header.mount("#header-container");
mainBody.mount("#main-body");
