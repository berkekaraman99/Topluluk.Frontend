import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, storeToRefs } from "pinia";
import { plugin as formKitPlugin, defaultConfig } from "@formkit/vue";
import {
  createFloatingLabelsPlugin,
  createMultiStepPlugin,
} from "@formkit/addons";
import { HubConnectionBuilder } from "@microsoft/signalr";

import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";
import "./assets/css/normalize.css";
import "./assets/css/main.css";
import { useAuthStore } from "./stores/auth";

const connection = new HubConnectionBuilder()
  .withUrl("https://localhost:7287/chat-hub", {
    skipNegotiation: true,
    transport: 1,
  })
  .withAutomaticReconnect()
  .configureLogging(1)
  .build();

const app = createApp(App);

app.provide("connection", connection);
app.use(createPinia());
app.use(router);
app.use(
  formKitPlugin,
  defaultConfig({
    plugins: [
      createMultiStepPlugin(),
      createFloatingLabelsPlugin({
        useAsDefault: false,
      }),
    ],
  })
);
app.mount("#app");

console.log(connection);

const loadUser = async () => {
  const authStore = useAuthStore();
  await authStore.loadUser().then(() => (authStore.userIsAuthorized = true));
};

loadUser();

router.beforeEach((to, from, next) => {
  const { _user } = storeToRefs(useAuthStore());
  if (
    _user.value == null &&
    to.name !== "login" &&
    to.name !== "signup" &&
    to.name !== "forgetpassword"
  ) {
    next({ name: "login" });
  } else if (
    _user.value != null &&
    (to.name === "login" ||
      to.name === "signup" ||
      to.name === "forgetpassword")
  ) {
    next({ name: "home" });
  } else next();
});
