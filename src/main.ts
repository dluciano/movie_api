import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vfonts/Lato.css";
import "./styles/index.css";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
