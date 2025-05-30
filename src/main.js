import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routes/router";
import "./style.css";

createApp(App).use(router).use(createPinia()).mount("#app");
