import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        isRequiredAuth: true
      },
      children: [
        {
          path: '',
          name: 'adminHome',
          component: () => import('../views/Admin/AdminHome.vue')
        },
        {
          path: '/employees',
          name: 'allEmployees',
          component: () => import('../views/Admin/AllEmployeeList.vue')
        },
        {
          path: '/employee/:id',
          name: 'employeeDetails',
          component: () => import('../views/Admin/EmployeeDetails.vue')
        },
        {
          path: '/add-employee',
          name: 'addEmployee',
          component: () => import('../views/Admin/AddEmployee.vue')
        },
        {
          path: '/tables',
          name: 'allTable',
          component: () => import('../views/Admin/AllTableList.vue')
        },
        {
          path: '/add-table',
          name: 'addTable',
          component: () => import('../views/Admin/AddTable.vue')
        },
        {
          path: '/foods',
          name: 'adminAllFood',
          component: () => import('../views/Admin/AllFoodList.vue')
        },
        {
          path: '/admin-add-food',
          name: 'adminFoodAdd',
          component: () => import('../views/Admin/AdminAddFood.vue')
        },
        {
          path: '/order',
          name: 'orderFood',
          component: () => import('../views/OrderFood.vue')
        },
        {
          path: '/orders',
          name: 'orderList',
          component: () => import('../views/Admin/OrderList.vue')
        }
      ]
    }
  ],
  linkActiveClass: 'active-nav-link'
})

router.beforeEach((to, from, next) => {
  const isUserAuthenticated = store.getters.getToken ? true : false
  const isRequiredAuth = to.matched.some((record) => record.meta.isRequiredAuth)

  if (isRequiredAuth && !isUserAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
