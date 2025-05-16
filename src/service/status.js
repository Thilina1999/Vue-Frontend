import apiClient from "./api";

export const getStatusPage = (page, per_page ) =>
  apiClient.get("/status_page", {
    params: {
      page,
      per_page,
    },
  });

  export const getSubproject = () => apiClient.get("/subproject");

