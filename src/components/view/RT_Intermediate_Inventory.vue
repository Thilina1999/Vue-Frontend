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
    <div class="grid grid-cols-8 items-center gap-4 flex-wrap">
      <div class="col-span-1">
        <Search_Title />
      </div>
      <div class="col-span-2">
        <Page_Bar class="w-full" :dataTransfer="inventoryManufactures" v-model="selectedManufacturer" text="メーカー" />
      </div>
      <div class="col-span-2">
        <Search class="w-full" v-model="searchText" text="品番" />
      </div>
      <div class="col-span-2">
        <Page_Bar class="w-full" :dataTransfer="shippingClassification" v-model="selectedShippingClassification"
          text="出荷区分" />
      </div>
      <div class="col-span-1"></div>
    </div>

    <br />
    <RT_Inventory_Tb :getInventoryPage="getInventoryPageData" :manufacturer="selectedManufacturer"
      :searchText="searchText" :shippingClassification="selectedShippingClassification" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import Title from '../atom/Title.vue'
import Title_Text from '../atom/Title_Text.vue'
import TimeFunction from '../molecules/TimeFunction.vue'
import RT_Inventory_Tb from '../organisms/RT_Inventory_Tb.vue'
import Page_Bar from '../atom/Page_Bar.vue'
import Search from '../atom/Search.vue'
import Search_Title from '../atom/Search_Title.vue'
import { getInventoryPage, getInventoryManufactures, getInventoryShippingClassification } from '../../service/inventory'

// Refs
const selectedManufacturer = ref(null)
const inventoryManufactures = ref([])
const shippingClassification = ref([])
const selectedShippingClassification = ref(null)
const searchText = ref('')

// Lifecycle hook
onMounted(() => {
  getInventoryManufactures()
    .then(res => {
      inventoryManufactures.value = res.data
    })
    .catch(err => {
      console.error('Error extracting data', err)
    })

  getInventoryShippingClassification().then(res => {
    shippingClassification.value = res.data
  }).catch(err => {
    console.error('Error extracting data', err)
  })
})

watch(searchText, (newVal, oldVal) => {
  console.log(searchText.value)
})

// Methods
const getInventoryPageData = async (page, perPage) => {
  try {
    const res = await getInventoryPage(page, perPage, selectedManufacturer.value, searchText.value, selectedShippingClassification.value)
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
