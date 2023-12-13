import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; // Elige un tema
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import router from "./router.js";
import { RouterLink } from "vue-router";
import "./_main.scss";

const app = createApp(App);

app.component("router-link", RouterLink);

app.use(router).use(PrimeVue).mount("#app");
