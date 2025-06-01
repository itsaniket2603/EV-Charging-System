// import { createRouter, createWebHistory } from 'vue-router'
// import LoginPage from '../pages/LoginPage.vue'
// import DashboardPage from '../pages/DashboardPage.vue'
//Import AddCharger, EditCharger pages later when ready

// const routes = [
//   { path: '/', name: 'Login', component: LoginPage },
//   { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
//   // Add other routes here
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ChargerForm from '../components/ChargerForm.vue'
import MapView from '../components/MapView.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginPage  },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/add-charger', name: 'AddCharger', component: ChargerForm },
  { path: '/edit-charger/:id', name: 'EditCharger', component: ChargerForm, props: true },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
  },
 ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

