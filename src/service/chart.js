import apiClient from "./api";

export const getGroupName = () => apiClient.get("/group_name");

export const getAssyNumber = () => apiClient.get("/number_list");

export const getDataChart = (ASSY品番, option, 開始日, 終了日, time_unit) =>
  apiClient.get("/inventory_history", {
    params: {
      ASSY品番,
      option,
      開始日,
      終了日,
      time_unit
    },
  });

  export const getThreshold = (品番, 在庫管理グループ名称) =>
  apiClient.get("/threshold_data", {
    params: {
      品番,
      在庫管理グループ名称
    },
  });