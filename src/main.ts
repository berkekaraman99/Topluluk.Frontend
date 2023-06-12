import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia, storeToRefs } from "pinia";
import { plugin as formKitPlugin, defaultConfig } from "@formkit/vue";
import {
  createFloatingLabelsPlugin,
  createMultiStepPlugin,
} from "@formkit/addons";
// import { HubConnectionBuilder } from "@microsoft/signalr";

import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";
import "./assets/css/normalize.css";
import "./assets/css/main.css";
import { useAuthStore } from "./stores/auth";
import io from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL, {
  autoConnect: false,
});

// const connection = new HubConnectionBuilder()
//   .withUrl("https://localhost:7287/chat-hub", {
//     skipNegotiation: true,
//     transport: 1,
//   })
//   .withAutomaticReconnect()
//   .configureLogging(1)
//   .build();

const app = createApp(App);

// app.provide("connection", connection);
app.provide("socket", socket);
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
