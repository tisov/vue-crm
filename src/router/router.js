import Vue from 'vue'
import VueRouter from 'vue-router'
import fb from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/categories',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/Categories.vue')
    },
    {
      path: '/detail-record/:id',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/DetailRecord.vue')
    },
    {
      path: '/history',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/History.vue')
    },
    {
      path: '/planning',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/Planning.vue')
    },
    {
      path: '/profile',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/Profile.vue')
    },
    {
      path: '/record',
      meta: { layout: 'main', auth: true },
      component: () => import('@/views/Record.vue')
    },
    {
      path: '/login',
      meta: { layout: 'empty' },
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/register',
      meta: { layout: 'empty' },
      component: () => import('@/views/auth/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = fb.auth().currentUser
  let requireAuth = to.matched.some(el => el.meta.auth)

  if (requireAuth && !user) {
    next('/login?msg=login')
  } else {
    next()
  }

})

export default router