// stores/inventoryStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { getBufferPage } from "../service/buffer";

export const useBufferStore = defineStore("buffer", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    page,
    perPage,
    selectedManufacturer,
    searchText,
    selectedShippingClassification,
    selectedHeaderRangFirst,
    selectedHeaderRangSecond
  ) => {
    return JSON.stringify({
      page,
      perPage,
      selectedManufacturer,
      searchText,
      selectedShippingClassification,
      selectedHeaderRangFirst,
      selectedHeaderRangSecond,
    });
  };

  const fetchPage = async (
    page,
    perPage,
    selectedManufacturer,
    searchText,
    selectedShippingClassification,
    selectedHeaderRangFirst,
    selectedHeaderRangSecond
  ) => {
    const cacheKey = getCacheKey(
      page,
      perPage,
      selectedManufacturer,
      searchText,
      selectedShippingClassification,
      selectedHeaderRangFirst,
      selectedHeaderRangSecond
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getBufferPage(
        page,
        perPage,
        selectedManufacturer,
        searchText,
        selectedShippingClassification,
        selectedHeaderRangFirst,
        selectedHeaderRangSecond
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch buffer:", error);
    }
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    fetchPage,
    clearCache,
  };
});
