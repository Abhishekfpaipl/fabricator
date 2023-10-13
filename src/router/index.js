import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "Home Page",
    component: HomeView,
    children: []
  },
  {
    path: "/fabric-accepted",
    name: "Fabric Page",
    component: () => import('@/views/FabricPage.vue'),
  },
  {
    path: "/fabric-procurement/:jobworkId",
    name: "Fabric Procurement",
    component: () => import('@/views/FabricProcurement.vue'),
  },
  {
    path: "/cutting-department",
    name: "Cutting Department",
    component: () => import('@/views/CuttingPage.vue'),
  },
  {
    path: "/ptocPage/:jobworkId",
    name: "Purchase To Cutting ",
    component: () => import('@/views/PurchaseToCuttingPage.vue')
  },
  {
    path: "/production-department",
    name: "Production Page",
    component: () => import('@/views/ProductionPage.vue'),
  },
  {
    path: "/production-detail/:purchaseId",
    name: "Production Detail",
    component: () => import('@/views/ProductionDetailPage.vue'),
  },
  {
    path: "/finishing-department",
    name: "Finishing Page",
    component: () => import('@/views/FinishingPage.vue'),
  },
  {
    path: "/finishing-detail-page/:purchaseId",
    name: "Finishing Detail",
    component: () => import('@/views/FinishingDetailPage.vue'),
  }, 
  {
    path: "/finishing-preview-page/:purchaseId",
    name: "Finishing Preview",
    component: () => import('@/views/FinishingPreviewPage.vue'),
  }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
