import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import ProductDetailPage from "@/pages/ProductDetailPage.vue";
import AdminBillPage from "@/pages/AdminBillPage.vue";
import AdminStaffPage from "@/pages/AdminStaffPage.vue";
import AdminCustornerPage from "@/pages/AdminCustornerPage.vue";
import CartPage from "@/pages/CartPage.vue";
import AdminPOSPage from "@/pages/Adminpospage.vue";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/", component: HomePage },
  { path: "/register", component: RegisterPage },
  { path: "/admin", component: AdminPage },
  { path: "/product/:id", name: "ProductDetail", component: ProductDetailPage },
  { path: "/bill", component: AdminBillPage },
  { path: "/staff", component: AdminStaffPage },
  { path: "/custorner", component: AdminCustornerPage },
  { path: "/cart", component: CartPage },
  { path: "/pos", component: AdminPOSPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
