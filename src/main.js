import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import InputNumber from 'primevue/inputnumber';
import FloatLabel from 'primevue/floatlabel';
import Button from "primevue/button";
import "primevue/resources/themes/aura-light-green/theme.css";
import 'primeicons/primeicons.css'

const app = createApp(App);

app.use(store).use(router);
app.use(PrimeVue);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("Button", Button);
app.mount("#app");
