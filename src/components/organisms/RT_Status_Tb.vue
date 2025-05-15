<template>
    <div class="overflow-x-auto p-1 pb-6">
        <table class="w-full table-auto border-separate border rounded-sm bg-white border-gray-500 text-white">
            <thead class="bg-white">
                <tr class="bg-gray-500 h-12 text-sm">
                    <th class="border border-gray-300 px-2 py-2">棚札ID</th>
                    <th class="border border-gray-300 px-2 py-2">品番</th>
                    <th class="border border-gray-300 px-2 py-2">次工程名称</th>
                    <th class="border border-gray-300 px-2 py-2">加工Lot</th>
                    <th class="border border-gray-300 px-2 py-2">数量</th>
                    <th class="border border-gray-300 px-2 py-2">作業状況</th>
                    <th class="border border-gray-300 px-2 py-2">棚札登録日時</th>
                    <th class="border border-gray-300 px-2 py-2">棚札更新日時</th>
                    <th class="border border-gray-300 px-2 py-2">滞留日数</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, index) in internalData" :key="index" class="bg-gray-300 text-black text-sm">
                    <td class="border border-gray-300 px-2 py-2">{{ row.棚札ID }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.品番 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.次工程名称 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.加工Lot }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.数量 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.作業状況 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.棚札登録日時 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.棚札更新日時 }}</td>
                    <td class="border border-gray-300 px-2 py-2">{{ row.滞留日数 }}</td>
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
import { ref, onMounted, computed } from 'vue'

// Props
const props = defineProps({
    getStatusPage: {
        type: Function,
        required: true,
    },
})

// Data
const currentPage = ref(1)
const rowsPerPage = ref(12)
const totalPages = ref(1)
const internalData = ref([])

// Methods
const goToPage = async (page) => {
    try {
        const res = await props.getStatusPage(page, rowsPerPage.value)
        internalData.value = res.data.data
        currentPage.value = res.data.meta.page
        totalPages.value = res.data.meta.total_pages
    } catch (err) {
        console.error('Failed to fetch inventory data:', err)
    }
}

// Smart pagination range with ellipsis logic
const paginationRange = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const delta = 2
    const range = []
    const rangeWithDots = []

    if (total <= 10) {
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

// Lifecycle
onMounted(() => {
    goToPage(1)
})
</script>
