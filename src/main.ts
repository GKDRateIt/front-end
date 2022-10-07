import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { UserApi } from "./api/user";

const isLoggedIn = ref(UserApi.isLoggedIn());
const updateIsLoggedIn = (value: boolean) => {
  isLoggedIn.value = value;
};

const app = createApp(App);
app.use(router);
app.provide("isLoggedIn", { isLoggedIn, updateIsLoggedIn });
app.mount("#app");
