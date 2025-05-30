// stores/inventoryStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { getStatusPage } from "../service/status";

export const useStatusStore = defineStore("status", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    page,
    perPage,
    tanafuda_id,
    product_number,
    next_process_name,
    work_status
  ) => {
    return JSON.stringify({
      page,
      perPage,
      tanafuda_id,
      product_number,
      next_process_name,
      work_status,
    });
  };

  const fetchPage = async (
    page,
    perPage,
    tanafuda_id,
    product_number,
    next_process_name,
    work_status
  ) => {
    const cacheKey = getCacheKey(
      page,
      perPage,
      tanafuda_id,
      product_number,
      next_process_name,
      work_status
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getStatusPage(
        page,
        perPage,
        tanafuda_id,
        product_number,
        next_process_name,
        work_status
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch Status:", error);
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
