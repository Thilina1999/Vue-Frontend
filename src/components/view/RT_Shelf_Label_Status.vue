<template>
    <div class="element">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="リアルタイム棚札ステータス" />
            <Title_Text class="text-lg" text="最終更新日時" />
            <TimeFunction class="text-lg" />
            <Title_Text class="text-lg" :text="`更新頻度: ${refreshKey} 分`" />
            <button type="button" @click="handleRefresh">
                <Refresh class="h-6 w-6 cursor-pointer" />
            </button>
        </div>
        <br />
        <div class="grid grid-cols-10 items-center gap-4 flex-wrap">
            <div class="col-span-1">
                <Search_Title text="絞込み検索" />
            </div>
            <div class="col-span-2">
                <Search class="w-full" text="棚札ID" v-model="tanafuda_id" />
            </div>
            <div class="col-span-2">
                <Search class="w-full" text="品番" v-model="product_number" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" :dataTransfer="subproject" text="次工程名称" v-model="next_process_name" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" :dataTransfer="status_all" text="作業状況" v-model="work_status" />
            </div>
            <div class="flex col-span-1 justify-end">
                <Csv_Icon />
            </div>
        </div>
        <br />
        <RT_Status_Tb :getStatusPage="getStatusPageData" :tanafuda_id="tanafuda_id" :product_number="product_number"
            :next_process_name="next_process_name" :work_status="work_status" :key="refreshKey" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue'
import TimeFunction from '../molecules/TimeFunction.vue'
import Search_Title from '../atom/Search_Title.vue';
import Search from '../atom/Search.vue';
import Page_Bar from '../atom/Page_Bar.vue';
import Csv_Icon from '../atom/Csv_Icon.vue';
import { getStatusPage, getSubproject, getStatus } from '../../service/status';
import RT_Status_Tb from '../organisms/RT_Status_Tb.vue';
import { loadConfig } from '../../utils/config'
import Refresh from '../../../public/assets/Refresh.vue';
import { refreshTbale, resetTimer } from '../../utils/refreshFunc'

const subproject = ref([])
const status_all = ref([])
const tanafuda_id = ref('')
const product_number = ref('')
const next_process_name = ref(null)
const work_status = ref(null)
const refreshIntervalSeconds = ref(10)
const refreshKey = ref(0)
const intervalId = ref(null)

onMounted(() => {
    getSubproject()
        .then(res => {
            subproject.value = res.data
        })
        .catch(err => {
            console.error('Error extracting data', err)
        })

    getStatus()
        .then(res => {
            status_all.value = res.data
            console.log(status_all)
        })
        .catch(err => {
            console.error('Error extracting data', err);
        });

    loadConfig(import.meta.env.VITE_STATUS).then(res => {
        refreshIntervalSeconds.value = res
        handleRefresh();
    }).catch(err => {
        console.error(err)
    })

})

const getStatusPageData = async (page, perPage) => {
    try {
        const res = await getStatusPage(page, perPage, tanafuda_id.value, product_number.value, next_process_name.value, work_status.value)
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
  refreshTbale(refreshKey, () =>
    resetTimer(intervalId, handleRefresh, refreshIntervalSeconds)
  )
}

</script>