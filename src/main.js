import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const app = createApp(App);

app.use(router);
app.mount("#app");

// AOS
AOS.init({
  duration: 1200,
  easing: "ease-out-cubic",
  once: false,
  offset: 50,
  delay: 100,
});
