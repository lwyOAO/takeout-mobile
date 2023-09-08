import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/components/layoutContainer.vue'),
      children: [
        {
          path: '/main',
          component: () => import('@/views/layout/mainPage.vue')
        },
        {
          path: '/main/orderlist',
          component: () => import('@/views/layout/orderList.vue')
        },
        {
          path: '/main/cart',
          component: () => import('@/views/layout/cartPage.vue')
        },
        {
          path: '/main/user',
          component: () => import('@/views/layout/userCenter.vue')
        }
      ]
    },
    {
      path: '/foodInfo/:id',
      component: () => import('@/views/food/foodInfo.vue')
    }
  ]
})

// 全局前置导航守卫
// 定义一个需要权限才能访问的路径数组
// const authURL = ['/main/orderlist', '/main/cart']
// router.beforeEach((to) => {
//   if(authURL.includes(to.path)) {
//     // TODO 判断是否有token
//   } else {
//     next()
//   }
// })
export default router
