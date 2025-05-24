  <template>
    <div class="element">
      <br />
      <div class="flex items-center space-x-4">
        <Title title="リアルタイム中間在庫" />
        <Title_Text class="text-lg" text="最終更新日時" />
        <TimeFunction class="text-lg" />
        <Title_Text class="text-lg" :text="`更新頻度:  ${inventoryKey} 分`" />
        <button type="button" @click="handleRefresh">
          <Refresh class="h-6 w-6 cursor-pointer" />
        </button>
      </div>
      <br />
      <div class="grid grid-cols-8 items-center gap-3 flex-wrap">
        <div class="col-span-1">
          <Search_Title text="絞込み検索" />
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
        <div class="flex col-span-1 justify-end">
          <Csv_Icon :handleClick="handleClick" />
        </div>
      </div>

      <br />
      <RT_Inventory_Tb :getInventoryPage="getInventoryPageData" :manufacturer="selectedManufacturer"
        :searchText="searchText" :shippingClassification="selectedShippingClassification" :key="inventoryKey" />
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
import Search_Title from '../atom/Search_Title.vue'
import Csv_Icon from '../atom/Csv_Icon.vue'
import { getInventoryPage, getInventoryManufactures, getInventoryShippingClassification, getInventory } from '../../service/inventory'
import Refresh from '../../../public/assets/Refresh.vue'
import { loadConfig } from '../../utils/config'
import { refreshTbale, resetTimer } from '../../utils/refreshFunc'
import { convertToCSV, downloadCSV } from '../../utils/csvFunc'
import { inventory } from '../constant/Data'

// Refs
const selectedManufacturer = ref(null)
const inventoryManufactures = ref([])
const shippingClassification = ref([])
const selectedShippingClassification = ref(null)
const searchText = ref('')
const refreshIntervalSeconds = ref(10)
const inventoryKey = ref(0)
const intervalId = ref(null)

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

  loadConfig(import.meta.env.VITE_INVENTORY).then(res => {
    refreshIntervalSeconds.value = res
    handleRefresh();
  }).catch(err => {
    console.error(err)
  })

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

const handleClick = async () => {
  try {
    const response = await getInventory()
    const data = response.data || []
    if (!data.length) {
      console.warn('No data to export.')
      return
    }
    const csv = convertToCSV(data, inventory)
    downloadCSV(csv, 'inventory_export.csv')
  } catch (error) {
    console.error('Error fetching inventory data:', error)
  }
}

const handleRefresh = () => {
  refreshTbale(inventoryKey, () =>
    resetTimer(intervalId, handleRefresh, refreshIntervalSeconds)
  )
}

</script>
