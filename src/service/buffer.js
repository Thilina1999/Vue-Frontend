import apiClient from "./api";

export const getBufferPage = (
  page,
  per_page
) =>
  apiClient.get("/capacity_weekly_page", {
    params: {
      page,
      per_page
    },
  });