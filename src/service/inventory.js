import apiClient from "./api";

export const getInventory = () => apiClient.get("/inventory");
export const getInventoryManufactures = () =>
  apiClient.get("/inventory_manufactures");
export const getInventoryPage = (page , per_page ) =>
  apiClient.get("/inventory_page", {
    params: {
      page,
      per_page
    },
  });
