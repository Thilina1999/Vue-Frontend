<template>
    <div class="overflow-x-auto p-1 pb-6">
        <table class="w-full table-auto border-separate border rounded-sm bg-white border-gray-500 text-white">
            <thead class="bg-white">
                <tr class="bg-gray-500 h-12 text-sm">
                    <th class="px-2 py-2">
                        <!-- Optional: Select all checkbox -->
                        <input type="checkbox" :checked="allSelected" @change="toggleSelectAll" />
                    </th>
                    <th class="px-2 py-2">No</th>
                    <th class="px-2 py-2">設備グループID</th>
                    <th class="px-2 py-2">設備機番</th>
                    <th class="px-2 py-2">設備グループ名称</th>
                    <th class="px-2 py-2">在庫管理グループID</th>
                    <th class="px-2 py-2">在庫管理グループ名称</th>
                    <th class="px-2 py-2">基準在庫日数</th>
                    <th class="px-2 py-2">基準在庫管理幅</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, index) in internalData" :key="index" class="bg-gray-300 text-black text-sm">
                    <td class="border border-gray-300 px-2 py-2 text-center">
                        <input type="checkbox" :value="getRowKey(row)" v-model="selectedRows"
                            @change="toggleDelete(getRowKey(row))" />

                    </td>


                    <td class="border border-gray-300 px-2 py-2 text-center">
                        {{ getRowNumber(index) }} </td>

                    <td class="border border-gray-300 px-2 py-2">
                        {{ row.設備グループID }}
                    </td>

                    <td class="border border-gray-300 px-2 py-2">
                        {{ row.設備機番 }}
                    </td>

                    <td class="border border-gray-300 px-2 py-2 text-right">
                        {{ row.設備グループ名称 }}
                    </td>

                    <!-- 在庫管理グループID -->
                    <td class="border border-gray-300 px-2 py-2" :class="{ 'bg-gray-400': isRowSelected(row) }">
                        <template v-if="isRowSelected(row)">
                            <input v-model="row.在庫管理グループID" @input="trackChange(row, index)"
                                class="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0" />
                        </template>
                        <template v-else>
                            {{ row.在庫管理グループID }}
                        </template>
                    </td>

                    <td class="border border-gray-300 px-2 py-2" :class="{ 'bg-gray-400': isRowSelected(row) }">
                        <template v-if="isRowSelected(row)">
                            <input v-model="row.在庫管理グループ名称" @input="trackChange(row, index)"
                                class="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0" />
                        </template>
                        <template v-else>
                            {{ row.在庫管理グループ名称 }}
                        </template>
                    </td>

                    <td class="border border-gray-300 px-2 py-2 text-right"
                        :class="{ 'bg-gray-400': isRowSelected(row) }">
                        <template v-if="isRowSelected(row)">
                            <input v-model="row.基準在庫日数" @input="trackChange(row, index)" type="number"
                                class="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-right" />
                        </template>
                        <template v-else>
                            {{ row.基準在庫日数 }}
                        </template>
                    </td>

                    <td class="border border-gray-300 px-2 py-2 text-right"
                        :class="{ 'bg-gray-400': isRowSelected(row) }">
                        <template v-if="isRowSelected(row)">
                            <input v-model="row.基準在庫管理幅" @input="trackChange(row, index)" type="number" step="0.01"
                                class="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-right" />
                        </template>
                        <template v-else>
                            {{ row.基準在庫管理幅 }}
                        </template>
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
    getInventoryPageData: {
        type: Function,
        required: true,
    },
    selectedValue: [Object, String],
    editedRows: [Object],
    deleteRows: {
        type: Array,
        default: () => []
    }
})

// Reactive state
const currentPage = ref(1)
const rowsPerPage = ref(14)
const totalPages = ref(1)
const internalData = ref([])
const dynamicHeaders = ref([])
const selectedRows = ref([]) // Track selected row indices

const originalData = ref([])

// Fetch data and determine structure dynamically
const goToPage = async (page) => {
    try {
        const res = await props.getInventoryPageData(page, rowsPerPage.value)
        internalData.value = res.data.data
        currentPage.value = res.data.meta.page
        totalPages.value = res.data.meta.total_pages

        internalData.value = JSON.parse(JSON.stringify(res.data.data))
        // keep original copy for comparison
        originalData.value = JSON.parse(JSON.stringify(res.data.data))

        if (internalData.value.length > 0) {
            const allKeys = new Set()
            internalData.value.forEach(obj => {
                Object.keys(obj).forEach(key => allKeys.add(key))
            })
            dynamicHeaders.value = Array.from(allKeys)
        }

        selectedRows.value = []
        emit('update:editedRows', [])
        emit('update:deleteRows', [])

    } catch (err) {
        console.error('Failed to fetch inventory data:', err)
    }
}

const emit = defineEmits(['update:editedRows', 'update:deleteRows'])

const trackChange = (row, index) => {
    const original = originalData.value[index]

    const isChanged =
        row.在庫管理グループID !== original.在庫管理グループID ||
        row.在庫管理グループ名称 !== original.在庫管理グループ名称 ||
        row.基準在庫日数 !== original.基準在庫日数 ||
        row.基準在庫管理幅 !== original.基準在庫管理幅

    const payload = {
        設備グループID: row.設備グループID,
        設備機番: row.設備機番,
        在庫管理グループID: row.在庫管理グループID,
        在庫管理グループ名称: row.在庫管理グループ名称,
        基準在庫日数: row.基準在庫日数,
        基準在庫管理幅: row.基準在庫管理幅,
    }

    let updated = [...props.editedRows]

    const existingIndex = updated.findIndex(
        r =>
            r.設備グループID === row.設備グループID &&
            r.設備機番 === row.設備機番
    )

    if (isChanged) {
        if (existingIndex !== -1) {
            updated[existingIndex] = payload
        } else {
            updated.push(payload)
        }
    } else {
        if (existingIndex !== -1) {
            updated.splice(existingIndex, 1)
        }
    }

    emit('update:editedRows', updated)
}

const isNumericValue = (value) => {
    if (typeof value === 'number') return true
    if (typeof value === 'string') {
        return /^-?\d*\.?\d+$/.test(value.trim())
    }
    return false
}

// Select all logic
const allSelected = computed(() =>
    internalData.value.length > 0 &&
    selectedRows.value.length === internalData.value.length
)

const toggleSelectAll = () => {
    if (allSelected.value) {
        selectedRows.value = []
    } else {
        selectedRows.value = internalData.value.map(row => getRowKey(row))
    }
}

const getRowKey = (row) => {
    return `${row.設備グループID}_${row.設備機番}`
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

const getRowNumber = (index) => {
    return (currentPage.value - 1) * rowsPerPage.value + index + 1
}

onMounted(() => {
    goToPage(1)
})

watch(
    () => [props.selectedValue],
    () => {
        goToPage(1)
    }
)

const toggleDelete = (key) => {
    let updatedDelete = [...(props.deleteRows || [])]
    let updatedEdited = [...(props.editedRows || [])]

    const deleteIndex = updatedDelete.indexOf(key)

    if (deleteIndex !== -1) {
        updatedDelete.splice(deleteIndex, 1)
    } else {
        updatedDelete.push(key)
    }

    updatedEdited = updatedEdited.filter(
        r => `${r.設備グループID}_${r.設備機番}` !== key
    )

    emit('update:deleteRows', updatedDelete)
    emit('update:editedRows', updatedEdited)
}

const isRowSelected = (row) => {
    const key = getRowKey(row)
    return (
        selectedRows.value.includes(key) ||
        (props.deleteRows || []).includes(key)
    )
}

</script>
