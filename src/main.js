import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

if (import.meta.env.DEV) {
  createApp(App).mount("#app");
} else {
  window.ZOHO.embeddedApp.on("PageLoad", function (data) {
    createApp(App, { id: data }).mount("#app");
  });
  window.ZOHO.embeddedApp.init();
}
