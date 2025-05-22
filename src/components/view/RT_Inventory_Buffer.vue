<template>
    <div class="element">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="リアルタイム中間在庫余力日数" />
            <Title_Text class="text-lg" text="最終更新日時" />
            <TimeFunction class="text-lg" />
            <Title_Text class="text-lg" :text="`更新頻度:  分`" />
            <button type="button">
                <Refresh class="h-6 w-6 cursor-pointer" />
            </button>
        </div>
        <br />
        <div class="grid grid-cols-8 items-center gap-3 flex-wrap">
            <div class="col-span-1">
                <Range_Filter />
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
        <div class="grid grid-cols-8 pt-4 items-center gap-3 flex-wrap">
            <div class="col-span-1">
                <Search_Title />
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
        :searchText="searchText" :shippingClassification="selectedShippingClassification" :rangeFirst="selectedHeaderRangFirst" :rangeSecond="selectedHeaderRangSecond" />

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

// 
const selectedHeaderRangFirst = ref(headers[0])
const selectedHeaderRangSecond = ref(headers.at(-1))
const bufferManufactures = ref([])
const shippingClassification = ref([])
const selectedManufacturer = ref(null)
const selectedShippingClassification = ref(null)
const searchText = ref('')


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

})

const getBufferPageData = async ( page, perPage ) => {
    try {
        const res = await getBufferPage( page, perPage, selectedManufacturer.value, searchText.value, selectedShippingClassification.value, selectedHeaderRangFirst.value, selectedHeaderRangSecond.value )
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


</script>
