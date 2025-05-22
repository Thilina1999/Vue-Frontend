<template>
    <div class="overflow-x-auto p-1 pb-6">
        <table class="w-full table-auto border-separate border rounded-sm  bg-white border-gray-500 text-white">
            <thead class="bg-white">
                <!-- First row: main headers -->
                <tr class="bg-gray-500 text-sm text-white">
                    <th class="px-2 py-2" rowspan="2">品番</th>
                    <th class="px-2 py-2" rowspan="2">メーカ</th>
                    <th class="px-2 py-2" rowspan="2">出荷区分</th>
                    <th class="px-2 py-2" rowspan="2">工程内在庫</th>
                    <th class="px-2 py-2" rowspan="2">入庫実績</th>
                    <th class="px-2 py-2" rowspan="2">出荷前在庫</th>
                    <th class="px-1 py-1 text-center" colspan="7">日別計画数</th>
                    <th class="px-2 py-2" rowspan="2">余力日数</th>
                </tr>
                <tr class="bg-gray-500 text-sm text-white">
                    <th class="px-1 py-1">11/8(金)</th>
                    <th class="px-1 py-1">11/9(土)</th>
                    <th class="px-1 py-1">11/10(日)</th>
                    <th class="px-1 py-1">11/11(月)</th>
                    <th class="px-1 py-1">11/12(火)</th>
                    <th class="px-1 py-1">11/13(水)</th>
                    <th class="px-1 py-1">11/14(木)</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(row, index) in internalData" :key="index">
                    <tr class="bg-gray-300 text-black text-sm">
                        <td class="border border-gray-300 px-2 py-2" rowspan="2">{{ row.品番 }}</td>
                        <td class="border border-gray-300 px-2 py-2" rowspan="2">{{ row.メーカ }}</td>
                        <td class="border border-gray-300 px-2 py-2" rowspan="2">{{ row.出荷区分 }}</td>
                        <td class="border border-gray-300 px-2 py-2 font-bold text-right" rowspan="2">{{ row.range_sum }}</td>
                        <td class="border border-gray-300 px-2 py-2 text-right" rowspan="2">{{ row.入庫実績 }}</td>
                        <td class="border border-gray-300 px-2 py-2 text-right" rowspan="2">{{ row.出荷前在庫 }}</td>

                        <td class="bg-yellow-300 border border-gray-300 px-1 py-1 text-right">{{ row.計画1 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画2 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画3 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画4 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画5 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画6 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.計画7 }}</td>
                        <td class="border border-gray-300 px-2 py-2 text-right" rowspan="2">7</td>
                    </tr>
                    <tr class="bg-gray-300 text-black text-sm">
                        <td class="bg-yellow-300 border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2) }}
                        </td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2 +
                            row.計画3) }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2 +
                            row.計画3 + row.計画4) }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2 +
                            row.計画3 + row.計画4 + row.計画5) }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2 +
                            row.計画3 + row.計画4 + row.計画5 + row.計画6) }}</td>
                        <td class="border border-gray-300 px-1 py-1 text-right">{{ row.出荷前在庫 - (row.計画1 + row.計画2 +
                            row.計画3 + row.計画4 + row.計画5 + row.計画6 + row.計画7) }}</td>
                    </tr>
                </template>
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

const props = defineProps({
    getBufferPageData: {
        type: Function,
        required: true,
    },
    manufacturer: [Object, String], // depends on your data
    searchText: String,
    shippingClassification: [Object, String],
    rangeFirst: [Object, String],
    rangeSecond: [Object, String]
})

const currentPage = ref(1)
const rowsPerPage = ref(7)
const totalPages = ref(1)
const internalData = ref([])
const summary = ref([])

// Methods
const goToPage = async (page) => {
    try {
        const res = await props.getBufferPageData(page, rowsPerPage.value)
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
    () => [props.manufacturer, props.searchText, props.shippingClassification, props.rangeFirst, props.rangeSecond],
    () => {
        goToPage(1)
    }
)
</script>
