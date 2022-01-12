import { createRouter, createWebHistory } from "vue-router";
import ShoppingList from "../views/ShoppingList.vue";
import Login from "../views/Login.vue";
import store from "../store/index.js";
const routes = [
  {
    path: "/shoppinglist",
    name: "ShoppingList",
    component: ShoppingList,
    alias: "/",
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresUnauth: true },
  },
  // {
  //   path: "/about",
  //   name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
