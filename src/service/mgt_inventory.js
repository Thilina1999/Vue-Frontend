import apiClient from "./api";

export const updateMgtMaster = (payload) =>
  apiClient.post("/update_mgt_master", payload);

export const addMgtMaster = (payload) =>
  apiClient.post("/add_mgt_master", payload);
