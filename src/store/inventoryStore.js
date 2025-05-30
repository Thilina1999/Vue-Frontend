// stores/inventoryStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { getInventoryPage } from "../service/inventory";

export const useInventoryStore = defineStore("inventory", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    page,
    perPage,
    selectedManufacturer,
    searchText,
    selectedShippingClassification
  ) => {
    return JSON.stringify({
      page,
      perPage,
      selectedManufacturer,
      searchText,
      selectedShippingClassification
    });
  };

  const fetchPage = async (
    page,
    perPage,
    selectedManufacturer,
    searchText,
    selectedShippingClassification
  ) => {
    const cacheKey = getCacheKey(
      page,
      perPage,
      selectedManufacturer,
      searchText,
      selectedShippingClassification
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getInventoryPage(
        page,
        perPage,
        selectedManufacturer,
        searchText,
        selectedShippingClassification
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
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
