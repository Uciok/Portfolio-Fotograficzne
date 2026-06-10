import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(Toast, {
  position: "bottom-right", // ZMIENIONE z top-right
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
  icon: true,
});

app.mount("#app");

AOS.init({
  duration: 800,
  once: true,
});
export default app;
