import { createRouter, createWebHistory } from 'vue-router'
import RT_Intermediate_Inventory from '../components/view/RT_Intermediate_Inventory.vue'
import RT_Shelf_Label_Status from '../components/view/RT_Shelf_Label_Status.vue'

const routes = [
  { path: '/', name: 'RT_Intermediate_Inventory', component: RT_Intermediate_Inventory },
  { path: '/about', name: 'RT_Shelf_Label_Status', component: RT_Shelf_Label_Status }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
