import apiClient from "./api";

export const getInventory = () => apiClient.get("/inventory");
export const getInventoryManufactures = () =>
  apiClient.get("/inventory_manufactures");
export const getInventoryPage = (page, per_page, メーカ, SUBASSY品番, 出荷区分 ) =>
  apiClient.get("/inventory_page", {
    params: {
      page,
      per_page,
      メーカ,
      SUBASSY品番,
      出荷区分,
    },
  });
export const getInventoryShippingClassification = () =>
  apiClient.get("/inventory_shipping_classification");
