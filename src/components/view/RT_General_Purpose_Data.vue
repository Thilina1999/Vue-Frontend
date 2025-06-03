<template>
    <div class="element pb-4">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="汎用テーブル表示" />
        </div>
        <br />
        <div class="grid grid-cols-8 items-center gap-4 flex-wrap">
            <div class="col-span-2">
                <Page_Bar_Placholder class="w-full" label="汎用テーブル" :dataTransfer="formRef" v-model="selectedValue" />
            </div>
        </div>
        <br />
        <Dynamic_Tb :getInventoryPage="getInventoryPageData" :selectedValue="selectedValue" :key="inventoryKey" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Title from '../atom/Title.vue';
import { useGeneralInventoryStore, useGeneralStatusStore } from '../../store/generalStore';
import Dynamic_Tb from '../organisms/Dynamic_Tb.vue';
import Page_Bar_Placholder from '../atom/Page_Bar_Placholder.vue';
import { page_slected } from '../constant/Data';
import { refreshTbale, resetTimer } from '../../utils/refreshFunc'
import { loadConfig } from '../../utils/config'

const inventoryStore = useGeneralInventoryStore()
const statusStore = useGeneralStatusStore()
const refreshIntervalSeconds = ref(10)
const inventoryKey = ref(0)
const intervalId = ref(null)

const formRef = ref([]);
const selectedValue = ref(page_slected[0].label);

const currentStore = computed(() => {
    const selectedOption = page_slected.find(item => item.label === selectedValue.value);
    if (!selectedOption) return null;

    return selectedOption.sheet === 'nox_assy_wip_inventories2'
        ? inventoryStore
        : statusStore;
});

onMounted(() => {
    formRef.value = page_slected.map(item => item.label);

    loadConfig(import.meta.env.VITE_DYNAMIC).then(res => {
        refreshIntervalSeconds.value = res
        handleRefresh();
    }).catch(err => {
        console.error(err)
    })
});

const getInventoryPageData = async (page, perPage) => {
    try {
        if (!currentStore.value) {
            throw new Error('No store selected');
        }
        const res = await currentStore.value.fetchPage(page, perPage, selectedValue.value)
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

const handleRefresh = () => {
    inventoryStore.clearCache();
    statusStore.clearCache();
    refreshTbale(inventoryKey, () =>
        resetTimer(intervalId, handleRefresh, refreshIntervalSeconds)
    )
}
</script>
