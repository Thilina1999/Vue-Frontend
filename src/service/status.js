import apiClient from "./api";

export const getStatusPage = ( page, per_page, 棚札ID, 品番, 次工程名称, 作業状況 ) =>
  apiClient.get("/status_page", {
    params: {
      page,
      per_page,
      棚札ID,
      品番,
      次工程名称,
      作業状況,
    },
  });

export const getSubproject = () => apiClient.get("/subproject");
export const getStatus = () => apiClient.get("/status_all");


