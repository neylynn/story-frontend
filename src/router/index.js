import { createWebHistory, createRouter } from "vue-router";

  const routes =  [
    {
      path: "/",
      component: () => import('../components/LoginView.vue'),
    },
    {
      path: "/logout",
      component: () => import('../components/LoginView.vue'),
    },
    {
      path: "/dashboard",
      component: () => import('../components/pages/StoryList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/create",
      component: () => import('../components/pages/StoryCreate.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/edit/:id",
      component: () => import('../components/pages/StoryEdit.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: "/show/:id",
      component: () => import('../components/pages/StoryShow.vue'),
      meta: { requiresAuth: true },
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

export default router;