import apiClient from "./api";

export const getGroupName = () =>
  apiClient.get("/group_name");

export const getDataChart = (
  ASSY品番,
  option,
  開始日,
  終了日
) =>
  apiClient.get("/inventory_history", {
    params: {
      ASSY品番,
      option,
      開始日,
      終了日
    },
  });