<template>
  <div class="overflow-x-auto p-1 pb-6">
    <table class="w-full table-auto border-separate border rounded-sm  bg-white border-gray-500 text-white">
      <thead class="bg-white">
        <tr class="text-black text-sm">
          <th class="summary-row border bg-yellow-500 border-gray-300 text-left px-2 py-3.5" colspan="4">
            工程合計
          </th>
          <th class="summary-row border bg-gray-300 border-gray-300 px-2 py-1" v-for="i in 10" :key="i">
            0
          </th>
        </tr>

        <tr class="bg-gray-500 h-12 text-sm">
          <th class="border border-gray-300 px-2 py-2">メーカー</th>
          <th class="border border-gray-300 px-2 py-2">ASSY品番</th>
          <th class="border border-gray-300 px-2 py-2">SUBASSY品番</th>
          <th class="border border-gray-300 px-2 py-2">出荷区分</th>
          <th class="border border-gray-300 px-2 py-2">気密検査</th>
          <th class="border border-gray-300 px-2 py-2">SCU</th>
          <th class="border border-gray-300 px-2 py-2">水蒸気検査</th>
          <th class="border border-gray-300 px-2 py-2">特性検査</th>
          <th class="border border-gray-300 px-2 py-2">特性検査端数品</th>
          <th class="border border-gray-300 px-2 py-2">アクセサリ</th>
          <th class="border border-gray-300 px-2 py-2">FA</th>
          <th class="border border-gray-300 px-2 py-2">FA端数品</th>
          <th class="border border-gray-300 px-2 py-2">外観検査</th>
          <th class="border border-gray-300 px-2 py-2">品番合計</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in internalData" :key="index" class="bg-gray-300 text-black text-sm">
          <td class="border border-gray-300 px-2 py-2">{{ row.メーカ }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.ASSY品番 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.SUBASSY品番 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.出荷区分 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.気密検査 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.SCU }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.水蒸気検査 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.特性検査 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.特性検査端数品 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.アクセサリ }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.FA }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.FA端数品 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.外観検査 }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ row.更新日時 }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="m-4 flex justify-center space-x-2 text-black">
    <button class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)">
      Prev
    </button>

    <button v-for="page in totalPages" :key="page" class="px-3 py-1 border rounded" :class="{
      'bg-gray-500 text-white': page === currentPage,
      'bg-gray-200': page !== currentPage,
    }" @click="goToPage(page)">
      {{ page }}
    </button>

    <button class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// Props
const props = defineProps({
  getInventoryPage: {
    type: Function,
    required: true,
  },
  manufacturer: [Object, String], // depends on your data
  searchText: String,
  shippingClassification: [Object, String],
})

// Data
const currentPage = ref(1)
const rowsPerPage = ref(10)
const totalPages = ref(1)
const internalData = ref([])

// Methods
const goToPage = async (page) => {
  try {
    const res = await props.getInventoryPage(page, rowsPerPage.value)
    internalData.value = res.data.data
    currentPage.value = res.data.meta.page
    totalPages.value = res.data.meta.total_pages
  } catch (err) {
    console.error('Failed to fetch inventory data:', err)
  }
}

// Lifecycle hooks
onMounted(() => {
  goToPage(1)
})

watch(
  () => [props.manufacturer, props.searchText, props.shippingClassification],
  () => {
    goToPage(1)
  }
)
</script>
