import apiClient from "./api";

export const getGroupName = () =>
  apiClient.get("/group_name");
