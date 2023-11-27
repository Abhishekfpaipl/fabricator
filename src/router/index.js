import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import authRoutes from './auth';
const routes = [
  {
    path: "/",
    name: "RootPage",
    component:()=>import('@/views/RootPage.vue'),
  },
  {
    path: "/dashboard",
    name: "Purchase Orders",
    component: HomeView,
    children: []
  },
  {
    path: "/fabric-accepted",
    name: "Material",
    component: () => import('@/views/FabricPage.vue'),
  },
  {
    path: "/fabric-procurement/:jobworkId",
    name: "Material Procurement",
    component: () => import('@/views/FabricProcurement.vue'),
  },
  {
    path: "/cutting-department",
    name: "Cutting",
    component: () => import('@/views/CuttingPage.vue'),
  },
  {
    path: "/ptocPage/:jobworkId",
    name: "Purchase To Cutting",
    component: () => import('@/views/PurchaseToCuttingPage.vue')
  },
  {
    path: "/production-department",
    name: "Production",
    component: () => import('@/views/ProductionPage.vue'),
  },
  {
    path: "/production-detail/:purchaseId",
    name: "Production Detail",
    component: () => import('@/views/ProductionDetailPage.vue'),
  },
  {
    path: "/production-jobwork/:purchaseId",
    name: "Production Jobwork Detail",
    component: () => import('@/views/ProductionJobworkDetailPage.vue'),
  },
  {
    path: "/finishing-department",
    name: "Sale Orders",
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
  {
    path: "/profile",
    name: "Profile Page",
    component: () => import('@/views/ProfilePage.vue'),
  },
  {
    path: "/offline",
    name: "OfflinePage",
    component: () => import('@/views/OfflinePage.vue'),
  },

  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
