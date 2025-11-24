import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Portfolio from "../views/Portfolio.vue";
import Services from "../views/Services.vue";
import Shop from "../views/Shop.vue";
import Booking from "../views/Booking.vue";
import Contact from "../views/Contact.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
    {
      path: "/services",
      name: "services",
      component: Services,
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
    {
      path: "/booking",
      name: "booking",
      component: Booking,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
  ],
  // DODAJ TO:
  scrollBehavior(to, from, savedPosition) {
    // Zawsze scrolluj na górę przy zmianie strony
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
