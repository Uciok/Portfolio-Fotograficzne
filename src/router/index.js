import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Portfolio from "../views/Portfolio.vue";
import Services from "../views/Services.vue";
import Shop from "../views/Shop.vue";
import Booking from "../views/Booking.vue";
import Contact from "../views/Contact.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import MyGalleries from "../views/MyGalleries.vue";
import Gallery from "../views/Gallery.vue";
import MyPurchases from "../views/MyPurchases.vue";
import Profile from "../views/Profile.vue";
import NotFound from "../views/NotFound.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
    },
    {
      path: "/about",
      name: "about",
      component: About,
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
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/galleries",
      name: "galleries",
      component: MyGalleries,
    },
    {
      path: "/gallery/:id",
      name: "gallery",
      component: Gallery,
    },
    {
      path: "/my-purchases",
      name: "my-purchases",
      component: MyPurchases,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("../views/Checkout.vue"),
      meta: { requiresAuth: true },
    },

    {
      path: "/payment/success",
      name: "PaymentSuccess",
      component: () => import("../views/PaymentSuccess.vue"),
      meta: {
        title: "Płatność zakończona",
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
