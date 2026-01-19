import { createApp } from "vue";
import App from "./App.vue";

import "./assets/mainweb.css";
import "./assets/admin.css";

import router from "./router";

createApp(App).use(router).mount("#app");
