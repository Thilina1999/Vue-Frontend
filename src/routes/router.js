import { createRouter, createWebHistory } from "vue-router";
import RT_Intermediate_Inventory from "../components/view/RT_Intermediate_Inventory.vue";
import RT_Shelf_Label_Status from "../components/view/RT_Shelf_Label_Status.vue";
import RT_Inventory_Buffer from "../components/view/RT_Inventory_Buffer.vue";
import RT_Interim_Inventory from "../components/view/RT_Interim_Inventory.vue";

const routes = [
  {
    path: "/",
    name: "RT_Intermediate_Inventory",
    component: RT_Intermediate_Inventory,
  },
  {
    path: "/status",
    name: "RT_Shelf_Label_Status",
    component: RT_Shelf_Label_Status,
  },
  {
    path: "/buffer",
    name: "RT_Inventory_Buffer",
    component: RT_Inventory_Buffer,
  },
  {
    path: "/chart",
    name: "RT_Interim_Inventory",
    component: RT_Interim_Inventory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
