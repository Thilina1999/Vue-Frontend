<template>
    <div class="scrollbar-top-wrapper">
        <div v-if="barCount * barWidth > 0" class="chart-container overflow-x-auto pl-8 pr-1"
            :style="{ minWidth: `${barCount * barWidth}px` }">
            <table class="w-full table-auto border-separate border rounded-sm bg-white text-black text-sm">
                <thead>
                    <tr class="bg-gray-500">
                        <th v-for="(label, i) in labels" :key="i" class="w-20 px-2 py-4 text-center text-wrap">
                            {{ label }}
                        </th>
                    </tr>
                    <tr>
                        <th v-for="(value, i) in values" :key="'t-' + i" class="px-2 py-2 text-center" :class="{
                            'bg-red-600': value < Number(threshold?.[0]?.基準在庫下限数),
                            'bg-orange-600': value > Number(threshold?.[0]?.基準在庫上限数),
                            'bg-green-600': value >= Number(threshold?.[0]?.基準在庫下限数) &&
                                value <= Number(threshold?.[0]?.基準在庫上限数)
                        }">
                            {{ value }}
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="chart-container" :style="{ minWidth: `${Math.max(barCount * barWidth, 1400)}px` }">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>



<script setup>
import { computed } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale)

const props = defineProps({
    labels: {
        type: Array,
        default: () => []
    },
    values: {
        type: Array,
        default: () => []
    },
    threshold: {
        type: Object,
    }
})


const barCount = props.labels.length
const barWidth = 90

const chartData = {
    labels: props.labels,
    datasets: [
        {
            type: 'bar',
            label: 'Output',
            data: props.values,
            backgroundColor: props.values.map(value => {
                const lower = Number(props.threshold?.[0]?.基準在庫下限数);
                const upper = Number(props.threshold?.[0]?.基準在庫上限数);

                if (value < lower) return 'red';     // Below minimum
                if (value > upper) return 'orange';  // Above maximum
                return 'green';                      // Within range
            }),
            borderSkipped: false,
            barThickness: 50
        },
        {
            type: 'line',
            label: 'Reference Points',
            data: props.values,
            borderColor: 'transparent',
            pointBackgroundColor: 'black',
            pointBorderColor: 'black',
            pointRadius: 5,
            pointStyle: 'circle',
            fill: false
        },
        {
            type: 'line',
            label: `Lower Limit (${props.threshold?.[0]?.基準在庫下限数 || 'N/A'})`,
            data: Array(props.values.length).fill(Number(props.threshold?.[0]?.基準在庫下限数 ?? 0)),
            borderColor: 'red',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: `Limit Line (${props.threshold?.[0]?.基準在庫数 || 'N/A'})`,
            data: Array(props.values.length).fill(Number(props.threshold?.[0]?.基準在庫数 ?? 0)),
            borderColor: 'green',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: `MAX LINE (${props.threshold?.[0]?.基準在庫上限数 || 'N/A'})`,
            data: Array(props.values.length).fill(Number(props.threshold?.[0]?.基準在庫上限数 ?? 0)),
            borderColor: 'orange',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        }
    ]
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                display: false // hide chart x-axis labels
            },

            grid: {
                display: true
            }
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 400,
            ticks: {
                stepSize: 50
            }
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            mode: 'index',
            intersect: false
        }
    }
}
</script>
