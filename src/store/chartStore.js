// stores/inventoryStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { getDataChart, getThreshold } from "../service/chart";

export const useChartStore = defineStore("chart", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    searchText,
    selectedGroupName,
    selectedDateFirst,
    selectedDateSecond,
    timeUnit
  ) => {
    return JSON.stringify({
      searchText,
      selectedGroupName,
      selectedDateFirst,
      selectedDateSecond,
      timeUnit,
    });
  };

  const fetchData = async (
    searchText,
    selectedGroupName,
    selectedDateFirst,
    selectedDateSecond,
    timeUnit
  ) => {
    const cacheKey = getCacheKey(
      searchText,
      selectedGroupName,
      selectedDateFirst,
      selectedDateSecond,
      timeUnit
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getDataChart(
        searchText,
        selectedGroupName,
        selectedDateFirst,
        selectedDateSecond,
        timeUnit
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    fetchData,
    clearCache,
  };
});

export const useThreshHoldStore = defineStore("threshold", () => {
  // State
  const cache = ref(new Map());

  const getCacheKey = (
    searchText,
    selectedGroupName
  ) => {
    return JSON.stringify({
      searchText,
      selectedGroupName
    });
  };

  const fetchData = async (
    searchText,
    selectedGroupName
  ) => {
    const cacheKey = getCacheKey(
      searchText,
      selectedGroupName
    );

    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey);
      return cached;
    }

    try {
      const res = await getThreshold(
        searchText,
        selectedGroupName
      );

      cache.value.set(cacheKey, res);
      return res;
    } catch (error) {
      console.error("Failed to fetch threshold data:", error);
    }
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    fetchData,
    clearCache,
  };
});
