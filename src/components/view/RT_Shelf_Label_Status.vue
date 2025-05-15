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
        <div class="grid grid-cols-8 items-center gap-4 flex-wrap">
            <div class="col-span-1">
                <Search_Title />
            </div>
        </div>
        <br />
        <RT_Status_Tb :getStatusPage="getStatusPageData" />
    </div>
</template>

<script setup>
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue'
import TimeFunction from '../molecules/TimeFunction.vue'
import Search_Title from '../atom/Search_Title.vue';
import { getStatusPage } from '../../service/status';
import RT_Status_Tb from '../organisms/RT_Status_Tb.vue';

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