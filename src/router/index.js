import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";
import ConnectPage from "../views/ConnectPage.vue";
import DevicePage from "../views/DevicePage.vue";
import SettingPage from "../views/SettingPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/connect",
  },
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "",
        redirect: "/connect",
      },
      {
        path: "connect",
        component: ConnectPage,
      },
      {
        path: "device",
        component: DevicePage,
      },
      {
        path: "setting",
        component: SettingPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
