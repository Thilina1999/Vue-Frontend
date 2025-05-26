<template>
    <div class="element pb-4">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="中間在庫推移" />
        </div>
        <br />
        <div class="grid grid-cols-10 items-center gap-4 flex-wrap">
            <div class="col-span-1">
                <Range_Filter text="条件設定" />
            </div>
            <div class="col-span-2">
                <Page_Bar_Placholder class="w-full" label="工程（必須)" :dataTransfer="headersGroup"
                    v-model="selectedGroupName" />
            </div>
            <div class="col-span-2">
                <Search_Chart class="w-full" v-model="searchText" text="品番 (必須)" />
            </div>
            <div class="col-span-2">
                <Date_Picker text="開始日" v-model="selectedDateFirst" />
            </div>
            <div class="col-span-2">
                <Date_Picker text="終了日" v-model="selectedDateSecond" />
            </div>
            <div class="flex col-span-1 justify-end">
                <Csv_Icon />
            </div>
        </div>
        <br />
        <div class="bg-gray-300 rounded-md ">
            <div class="flex gap-x-4 p-1 pr-6 pt-5 justify-end">
                <Radio_Button text="日单位" id="hs-radio-group-1" name="time-unit" value="日单位" v-model="timeUnit" />
                <Radio_Button text="時单位" id="hs-radio-group-2" name="time-unit" value="時单位" v-model="timeUnit" />
            </div>

            <div class="p-5 lg:grid lg:grid-cols-12 flex-wrap items-end">
                <div class="col-span-1 justify-start flex">
                    <Tray_Tbale header="ASSY品番" :number="`${searchText}`" />
                </div>
                <div class="col-span-11 justify-items-start">
                    <RT_Bar_Chart :key="chartKey" :labels="chartData.labels" :values="chartData.values"
                        :threshold="threshold" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Title from '../atom/Title.vue';
import RT_Bar_Chart from '../organisms/RT_Bar_Chart.vue';
import Tray_Tbale from '../atom/Tray_Tbale.vue';
import Range_Filter from '../atom/Range_Filter.vue';
import Page_Bar_Placholder from '../atom/Page_Bar_Placholder.vue';
import { getGroupName, getDataChart, getThreshold } from '../../service/chart';
import Search_Chart from '../atom/Search_Chart.vue';
import Csv_Icon from '../atom/Csv_Icon.vue';
import Date_Picker from '../atom/Date_Picker.vue';
import Radio_Button from '../atom/Radio_Button.vue';

const headersGroup = ref([])
const selectedGroupName = ref(null)
const searchText = ref('')
const selectedDateFirst = ref(null)
const selectedDateSecond = ref(null)
const chartData = ref({
    labels: [],
    values: []
})
const threshold = ref([])
const chartKey = ref(0)
const timeUnit = ref('時单位')

onMounted(() => {
    getGroupName()
        .then(res => {
            headersGroup.value = res.data
            selectedGroupName.value = headersGroup.value[0]
        })
        .catch(err => {
            console.error('Error extracting data', err)
        })
})

const getChartData = async () => {
    try {
        const res = await getDataChart(searchText.value, selectedGroupName.value, selectedDateFirst.value, selectedDateSecond.value, timeUnit.value)
        chartData.value = processChartData(res.data);
        const res_thresh = await getThreshold(searchText.value, selectedGroupName.value)
        threshold.value = res_thresh.data
        chartKey.value++
    } catch (err) {
        console.error('Error fetching paginated inventory:', err)
        chartData.value = { labels: [], values: [] }

    }
}

watch(
    [searchText, selectedGroupName, selectedDateFirst, selectedDateSecond, timeUnit],
    () => {
        if (searchText.value &&
            selectedGroupName.value &&
            selectedDateFirst.value &&
            selectedDateSecond.value) {
            getChartData()
        }
    },
    { deep: true }
)

const processChartData = (apiData) => {
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const labels = apiData.map(item => formatDate(item.time));
    const values = apiData.map(item => item.data);

    return { labels, values };
};

</script>
