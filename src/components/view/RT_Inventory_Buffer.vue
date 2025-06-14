<template>
    <div class="element pb-2">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="リアルタイム中間在庫余力日数" />
            <Title_Text class="text-lg" text="最終更新日時" />
            <TimeFunction class="text-lg" />
            <Title_Text class="text-lg" :text="`更新頻度: ${inventoryKey} 分`" />
            <button type="button" @click="handleRefresh">
                <Refresh class="h-6 w-6 cursor-pointer" />
            </button>
        </div>
        <br />
        <div class="grid grid-cols-8 items-center gap-4 flex-wrap">
            <div class="col-span-1">
                <Range_Filter text="工程内在庫数" />
            </div>
            <div class="col-span-3">
                <Page_Bar_Placholder class="w-full" label="開始工程" :dataTransfer="headers"
                    v-model="selectedHeaderRangFirst" />
            </div>
            <div class="col-span-3">
                <Page_Bar_Placholder class="w-full" label="終了工程" :dataTransfer="headers"
                    v-model="selectedHeaderRangSecond" />
            </div>

        </div>
        <div class="grid grid-cols-8 pt-4 items-center gap-4 flex-wrap">
            <div class="col-span-1">
                <Search_Title text="絞込み検索" />
            </div>
            <div class="col-span-2">
                <Search text="品番" v-model="searchText" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" text="メーカ" :dataTransfer="bufferManufactures" v-model="selectedManufacturer" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" text="出荷区分" :dataTransfer="shippingClassification"
                    v-model="selectedShippingClassification" />
            </div>
            <div class="flex col-span-1 justify-end">
                <Csv_Icon />
            </div>
        </div>
        <br />
        <RT_Buffer_Tb :getBufferPageData="getBufferPageData" :manufacturer="selectedManufacturer"
            :searchText="searchText" :shippingClassification="selectedShippingClassification"
            :rangeFirst="selectedHeaderRangFirst" :rangeSecond="selectedHeaderRangSecond" :key="inventoryKey" />

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import TimeFunction from '../molecules/TimeFunction.vue';
import Refresh from '../../../public/assets/Refresh.vue';
import Search_Title from '../atom/Search_Title.vue'
import Range_Filter from '../atom/Range_Filter.vue';
import Search from '../atom/Search.vue';
import Page_Bar from '../atom/Page_Bar.vue';
import Csv_Icon from '../atom/Csv_Icon.vue';
import Page_Bar_Placholder from '../atom/Page_Bar_Placholder.vue';
import RT_Buffer_Tb from '../organisms/RT_Buffer_Tb.vue';
import { headers } from '../constant/Data';
import { getBufferPage, getBufferManufactures, getBufferShipping } from '../../service/buffer';
import { loadConfig } from '../../utils/config'
import { refreshTbale, resetTimer } from '../../utils/refreshFunc'
import { useBufferStore } from '../../store/bufferStore';

// 
const selectedHeaderRangFirst = ref(headers[0])
const selectedHeaderRangSecond = ref(headers.at(-1))
const bufferManufactures = ref([])
const shippingClassification = ref([])
const selectedManufacturer = ref(null)
const selectedShippingClassification = ref(null)
const searchText = ref('')
const refreshIntervalSeconds = ref(10)
const inventoryKey = ref(0)
const intervalId = ref(null)
const bufferStore = useBufferStore()


onMounted(() => {
    getBufferManufactures()
        .then(res => {
            bufferManufactures.value = res.data
        })
        .catch(err => {
            console.error('Error extracting data', err)
        })

    getBufferShipping().then(res => {
        shippingClassification.value = res.data
    }).catch(err => {
        console.error('Error extracting data', err)
    })

    loadConfig(import.meta.env.VITE_BUFFER).then(res => {
        refreshIntervalSeconds.value = res
        handleRefresh();
    }).catch(err => {
        console.error(err)
    })
})

const getBufferPageData = async (page, perPage) => {
    try {
        const res = await bufferStore.fetchPage(page, perPage, selectedManufacturer.value, searchText.value, selectedShippingClassification.value, selectedHeaderRangFirst.value, selectedHeaderRangSecond.value)
        return res
    } catch (err) {
        console.error('Error fetching paginated Week Capacity:', err)
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
    bufferStore.clearCache();
    refreshTbale(inventoryKey, () =>
        resetTimer(intervalId, handleRefresh, refreshIntervalSeconds)
    )
}

</script>
