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
import io from "socket.io-client";

//THEME OR CSS
import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";
import "./style.css";
import "@/assets/css/style.scss";

const URL = "http://localhost:4000";
const socket = io(URL, {
  autoConnect: false,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

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
