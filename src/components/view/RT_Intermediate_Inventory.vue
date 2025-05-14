<template>
  <div class="element">
    <br />
    <div class="flex items-center space-x-4">
      <Title title="リアルタイム中間在庫" />
      <Title_Text class="text-lg" text="最終更新日時" />
      <TimeFunction class="text-lg" />
      <Title_Text class="text-lg" text="更新頻度:" />
    </div>
    <br />
    <div class="flex items-center space-x-2 flex-wrap">
      <Search class="m-2" text="絞込み検索" />
      <Page_Bar class="m-2" />
    </div>
    <br />
    <RT_Inventory_Tb :getInventoryPage="getInventoryPageData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Title from '../atom/Title.vue'
import Title_Text from '../atom/Title_Text.vue'
import TimeFunction from '../molecules/TimeFunction.vue'
import RT_Inventory_Tb from '../organisms/RT_Inventory_Tb.vue'
import Page_Bar from '../atom/Page_Bar.vue'
import Search from '../atom/Search.vue'
import { getInventoryPage, getInventoryManufactures } from '../../service/inventory'

// Refs
const inventoryData = ref([])
const inventoryManufactures = ref([])

// Lifecycle hook
onMounted(() => {
  getInventoryManufactures()
    .then(res => {
      inventoryManufactures.value = res.data
    })
    .catch(err => {
      console.error('Error extracting data', err)
    })
})

// Methods
const getInventoryPageData = async (page, perPage) => {
  try {
    const res = await getInventoryPage(page, perPage)
    return res
  } catch (err) {
    console.error('Error fetching paginated inventory:', err)
    return {
      data: [],
      meta: {
        page: 1,
        per_page: perPage,
        total_items: 0,
        total_pages: 1
      }
    }
  }
}
</script>

<style scoped></style>
