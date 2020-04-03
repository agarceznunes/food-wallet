import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeAdmin from '../views/HomeAdmin.vue'

// Account
import Login from '../views/account/Login.vue'
import Perfil from '../views/account/Perfil.vue'

// Admin
import UserRegister from '../views/admin/UserRegister.vue'
import Points from '../views/admin/Points.vue'
import Coupons from '../views/admin/Coupons.vue'
import Plans from '../views/admin/Plans.vue'

// import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/home-admin',
    name: 'HomeAdmin',
    component: HomeAdmin,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/user-register',
    name: 'UserRegister',
    component: UserRegister,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/points',
    name: 'Points',
    component: Points,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: Coupons,
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans,
    // meta: {
    //   requiresAuth: true
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('home')
//   else next()
// })

export default router
