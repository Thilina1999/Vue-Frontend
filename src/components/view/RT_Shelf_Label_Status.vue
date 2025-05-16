<template>
    <div class="element">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="リアルタイム棚札ステータス" />
            <Title_Text class="text-lg" text="最終更新日時" />
            <TimeFunction class="text-lg" />
            <Title_Text class="text-lg" text="更新頻度:" />
        </div>
        <br />
        <div class="grid grid-cols-10 items-center gap-3 flex-wrap">
            <div class="col-span-1">
                <Search_Title />
            </div>
            <div class="col-span-2">
                <Search text="棚札ID" />
            </div>
            <div class="col-span-2">
                <Search text="品番" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" :dataTransfer="subproject" text="次工程名称" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" text="作業状況" />
            </div>
            <div class="flex col-span-1 justify-end">
                <Csv_Icon />
            </div>
        </div>
        <br />
        <RT_Status_Tb :getStatusPage="getStatusPageData" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect } from 'vue'
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue'
import TimeFunction from '../molecules/TimeFunction.vue'
import Search_Title from '../atom/Search_Title.vue';
import Search from '../atom/Search.vue';
import Page_Bar from '../atom/Page_Bar.vue';
import Csv_Icon from '../atom/Csv_Icon.vue';
import { getStatusPage, getSubproject } from '../../service/status';
import RT_Status_Tb from '../organisms/RT_Status_Tb.vue';

const subproject = ref([])

onMounted(() => {
  getSubproject()
    .then(res => {
      subproject.value = res.data
    })
    .catch(err => {
      console.error('Error extracting data', err)
    })
})

const getStatusPageData = async (page, perPage) => {
    try {
        const res = await getStatusPage(page, perPage)
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
</script>