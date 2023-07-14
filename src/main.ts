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
import vue3GoogleLogin from "vue3-google-login";

import { createI18n } from "vue-i18n/dist/vue-i18n.cjs";
//Translations
import en from "./locales/en.json";
import tr from "./locales/tr.json";

//THEME OR CSS
import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";
import "./style.css";
import "@/assets/css/style.scss";

const URL = "http://localhost:4000";
const socket = io(URL, {
  autoConnect: false,
});

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale:
    localStorage.getItem("locale") != null
      ? localStorage.getItem("locale")
      : "tr",
  fallbackLocale:
    localStorage.getItem("fallbacklocale") != null
      ? localStorage.getItem("fallbacklocale")
      : "tr",
  messages: { tr, en },
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
app.use(i18n);
app.use(vue3GoogleLogin, {
  clientId:
    "986753015425-6atqct07o1o8a7epeg0qgn2tbmqtv5rl.apps.googleusercontent.com",
});

// app.config.globalProperties.$i18n = i18n;

app.mount("#app");
