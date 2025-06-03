import apiClient from "./api";

export const getInventoryGeneralPage = (
  page,
  per_page
) =>
  apiClient.get("/inventory_page", {
    params: {
      page,
      per_page
    },
  });

export const getStatusGeneralPage = ( page, per_page ) =>
  apiClient.get("/status_page", {
    params: {
      page,
      per_page
    },
  });

  