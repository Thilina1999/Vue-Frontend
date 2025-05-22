import apiClient from "./api";

export const getBufferPage = (
  page,
  per_page,
  メーカ,
  品番,
  出荷区分,
  開始工程,
  終了工程
) =>
  apiClient.get("/capacity_weekly_page", {
    params: {
      page,
      per_page,
      メーカ,
      品番,
      出荷区分,
      開始工程,
      終了工程
    },
  });

export const getBufferManufactures = () => apiClient.get("/manufacture_buffer");

export const getBufferShipping = () =>
  apiClient.get("/shipping_classification_buffer");
