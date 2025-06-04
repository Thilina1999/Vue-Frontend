import { defineStore } from "pinia";
import { ref } from "vue";
import { getInventoryGeneralPage, getStatusGeneralPage } from "../service/general";

export const useGeneralInventoryStore = defineStore("general_inventory", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    page,
    perPage,
    key
  ) => {
    return JSON.stringify({
      page,
      perPage,
      key
    });
  };

  const fetchPage = async (
    page,
    perPage,
    selectedValue
  ) => {
    const cacheKey = getCacheKey(
      page,
      perPage,
      selectedValue
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getInventoryGeneralPage(
        page,
        perPage
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch inventory General Table:", error);
    }
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    fetchPage,
    clearCache
  };
});

export const useGeneralStatusStore = defineStore("general_status", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    page,
    perPage,
    key
    
  ) => {
    return JSON.stringify({
      page,
      perPage,
      key
    });
  };

  const fetchPage = async (
    page,
    perPage,
    selectedValue
  ) => {
    const cacheKey = getCacheKey(
      page,
      perPage,
      selectedValue
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getStatusGeneralPage(
        page,
        perPage
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch Status General Table:", error);
    }
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    fetchPage,
    clearCache
  };
});