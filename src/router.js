import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./components/InitPage.vue"),
  },
  // {
  //   path: "/contactos",
  //   name: "Contactos",
  //   component: () => import("./components/ContactPage.vue"),
  // },
  // {
  //   path: "/productos",
  //   name: "Productos",
  //   component: () => import("./components/ProductPage.vue"),
  // },
  // {
  //   path: "/servicios",
  //   name: "Servicios",
  //   component: () => import("./components/SerevicePage.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
