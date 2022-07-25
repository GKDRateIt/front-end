import { createApp, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { isLoggedInRaw } from "./common";

const isLoggedIn = ref(isLoggedInRaw());
const updateIsLoggedIn = (value: boolean) => {
  isLoggedIn.value = value;
};

const app = createApp(App);
app.use(router);
app.provide("isLoggedIn", { isLoggedIn, updateIsLoggedIn });
app.mount("#app");
