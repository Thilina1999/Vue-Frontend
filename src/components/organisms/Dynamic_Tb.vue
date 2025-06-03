<template>
    <div class="overflow-x-auto p-1 pb-6">
        <table class="w-full table-auto border-separate border rounded-sm bg-white border-gray-500 text-white">
            <thead class="bg-white">
                <tr class="bg-gray-500 h-12 text-sm">
                    <th v-for="(header, index) in dynamicHeaders" :key="index" class="px-2 py-2">
                        {{ header }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, rowIndex) in internalData" :key="rowIndex" class="bg-gray-300 text-black text-sm">
                    <td v-for="(value, colKey) in row" :key="colKey" class="border border-gray-300 px-2 py-2"
                        :class="{ 'text-right': isNumericValue(value) }">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination remains the same -->
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
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps({
    getInventoryPage: {
        type: Function,
        required: true,
    },
    selectedValue: [Object, String]
})

// Reactive state
const currentPage = ref(1)
const rowsPerPage = ref(12)
const totalPages = ref(1)
const internalData = ref([])
const dynamicHeaders = ref([])

// Fetch data and determine structure dynamically
const goToPage = async (page) => {
    try {
        const res = await props.getInventoryPage(page, rowsPerPage.value)
        internalData.value = res.data.data
        currentPage.value = res.data.meta.page
        totalPages.value = res.data.meta.total_pages

        // Generate dynamic headers from all available keys
        if (internalData.value.length > 0) {
            const allKeys = new Set()
            internalData.value.forEach(obj => {
                Object.keys(obj).forEach(key => allKeys.add(key))
            })
            dynamicHeaders.value = Array.from(allKeys)
        }
    } catch (err) {
        console.error('Failed to fetch inventory data:', err)
    }
}

// Detect if a value should be right-aligned
const isNumericValue = (value) => {
    if (typeof value === 'number') return true
    if (typeof value === 'string') {
        // Check if string represents a number (including integers and decimals)
        return /^-?\d*\.?\d+$/.test(value.trim())
    }
    return false
}

// Pagination range calculation
const paginationRange = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const delta = 2
    const range = []
    if (total <= 5) {
        for (let i = 1; i <= total; i++) range.push(i)
        return range
    }
    range.push(1)
    if (current - delta > 2) range.push('...')
    const start = Math.max(2, current - delta)
    const end = Math.min(total - 1, current + delta)
    for (let i = start; i <= end; i++) range.push(i)
    if (current + delta < total - 1) range.push('...')
    if (total > 1) range.push(total)
    return range
})

onMounted(() => {
    goToPage(1)
})

watch(
    () => [props.selectedValue],
    () => {
        goToPage(1)
    }
)
</script>