<template>
  <div class="overflow-x-auto p-1 pb-6">
    <table class="w-full table-auto border-separate border rounded-sm  bg-white border-gray-500 text-white">
      <thead class="bg-white">
        <tr class="text-black text-sm">
          <th class="summary-row border bg-yellow-500 border-gray-300 text-left px-2 py-3.5" colspan="4">
            工程合計
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['気密検査'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['気密検査'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['SCU'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['SCU'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['水蒸気検査'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['水蒸気検査'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['特性検査'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['特性検査'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['特性検査端数品'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['特性検査端数品'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['アクセサリ'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['アクセサリ'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['FA'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['FA'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['FA端数品'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['FA端数品'] }}</span>
          </th>

          <th class="summary-row border border-gray-300 px-2 py-1 relative bg-gray-100">
            <div class="absolute top-0 left-0 h-full bg-blue-500"
              :style="{ width: ((summary['外観検査'] / summary.total) * 100).toFixed(1) + '%' }"></div>
            <span class="relative">{{ summary['外観検査'] }}</span>
          </th>

          <th class="summary-row border bg-black px-2 py-1"></th>
        </tr>


        <tr class="bg-gray-500 h-12 text-sm">
          <th class="px-2 py-2">メーカー</th>
          <th class="px-2 py-2">ASSY品番</th>
          <th class="px-2 py-2">SUBASSY品番</th>
          <th class="px-2 py-2">出荷区分</th>
          <th class="px-2 py-2">気密検査</th>
          <th class="px-2 py-2">SCU</th>
          <th class="px-2 py-2">水蒸気検査</th>
          <th class="px-2 py-2">特性検査</th>
          <th class="px-2 py-2">特性検査端数品</th>
          <th class="px-2 py-2">アクセサリ</th>
          <th class="px-2 py-2">FA</th>
          <th class="px-2 py-2">FA端数品</th>
          <th class="px-2 py-2">外観検査</th>
          <th class="bg-yellow-500 px-2 py-2">品番合計</th>
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
          <td class="border border-gray-300 px-2 py-2 font-bold text-right">
            {{ rowTotal(row) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="m-4 flex justify-center space-x-2 text-black">
    <button class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)">
      Prev
    </button>

    <template v-for="page in paginationRange" :key="page">
      <button v-if="page !== '...'" class="px-3 py-1 border rounded" :class="{
        'bg-gray-500 text-white': page === currentPage,
        'bg-gray-200': page !== currentPage,
      }" @click="goToPage(page)">
        {{ page }}
      </button>
      <span v-else class="text-white px-3 py-1">...</span>
    </template>

    <button class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)">
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

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
const rowsPerPage = ref(11)
const totalPages = ref(1)
const internalData = ref([])
const summary = ref([])

// Methods
const goToPage = async (page) => {
  try {
    const res = await props.getInventoryPage(page, rowsPerPage.value)
    internalData.value = res.data.data
    summary.value = res.data.summary
    currentPage.value = res.data.meta.page
    totalPages.value = res.data.meta.total_pages
  } catch (err) {
    console.error('Failed to fetch inventory data:', err)
  }
}

const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const delta = 3
  const range = []
  const rangeWithDots = []

  if (total <= 8) {
    for (let i = 1; i <= total; i++) {
      range.push(i)
    }
    return range
  }

  const start = Math.max(2, current - delta)
  const end = Math.min(total - 1, current + delta)

  range.push(1)
  if (start > 2) range.push('...')
  for (let i = start; i <= end; i++) range.push(i)
  if (end < total - 1) range.push('...')
  range.push(total)

  return range
})
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

function rowTotal(row) {
  return (
    Number(row.気密検査 || 0) +
    Number(row.SCU || 0) +
    Number(row.水蒸気検査 || 0) +
    Number(row.特性検査 || 0) +
    Number(row.特性検査端数品 || 0) +
    Number(row.アクセサリ || 0) +
    Number(row.FA || 0) +
    Number(row.FA端数品 || 0) +
    Number(row.外観検査 || 0)
  )
}

</script>
