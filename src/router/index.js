import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import authRoutes from './auth';
const routes = [
  {
    path: "/",
    name: "RootPage",
    component: () => import('@/views/RootPage.vue'),
  },
  {
    path: "/dashboard",
    name: "Purchase Orders",
    component: HomeView,
    children: []
  },
  {
    path: "/material",
    children: [
      {
        path: "accepted",
        name: "MaterialAccepted",
        component: () => import('@/views//material/MaterialAccepted.vue'),
      },
      {
        path: "procurement/:poId",
        name: "MaterialProcurement",
        component: () => import('@/views/material/MaterialProcurement.vue'),
      }
    ]
  },
  {
    path: "/cutting",
    children: [
      {
        path: "list",
        name: "CuttingList",
        component: () => import('@/views/cutting/CuttingList.vue'),
      },
      {
        path: "detail/:poId",
        name: "CuttingDetail",
        component: () => import('@/views/cutting/CuttingDetailPage.vue')
      },

    ]
  },
  {
    path: "/production",
    children: [
      {
        path: "list",
        name: "ProductionList",
        component: () => import('@/views/production/ProductionList.vue'),
      },
      {
        path: "detail/:purchaseId",
        name: "ProductionDetail",
        component: () => import('@/views/production/ProductionDetailPage.vue'),
      },
      {
        path: "jobwork/:purchaseId",
        name: "ProductionJobworkDetail",
        component: () => import('@/views/production/ProductionJobworkDetailPage.vue'),
      },
    ]
  },
  {
    path: "/saleOrder",
    children: [
      {
        path: "list",
        name: "SaleOrderList",
        component: () => import('@/views/saleOrders/SaleOrderList.vue'),
      },
      {
        path: "detail-page/:purchaseId",
        name: "SaleOrderDetail",
        component: () => import('@/views/saleOrders/SaleOrderDetail.vue'),
      },
      {
        path: "preview-page/:purchaseId",
        name: "SaleOrderPreview",
        component: () => import('@/views/saleOrders/SaleOrderPreviewPage.vue'),
      },
    ]
  },
  // {
  //   path: "/finishing-department",
  //   name: "Sale Orders",
  //   component: () => import('@/views/FinishingPage.vue'),
  // },
  // {
  //   path: "/finishing-detail-page/:purchaseId",
  //   name: "Finishing Detail",
  //   component: () => import('@/views/FinishingDetailPage.vue'),
  // },
  // {
  //   path: "/finishing-preview-page/:purchaseId",
  //   name: "Finishing Preview",
  //   component: () => import('@/views/FinishingPreviewPage.vue'),
  // },
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
