import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { plugin as formKitPlugin, defaultConfig } from "@formkit/vue";
import {
  createFloatingLabelsPlugin,
  createMultiStepPlugin,
} from "@formkit/addons";

import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";
import "./assets/css/normalize.css";
import "./assets/css/main.css";
import "./style.css";
import { useAuthStore } from "./stores/auth";
import io from "socket.io-client";

const URL = "http://localhost:4000";
const socket = io(URL, {
  autoConnect: false,
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.provide("socket", socket);
app.use(pinia);
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
