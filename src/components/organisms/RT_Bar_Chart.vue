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
                    <tr class="bg-red-600">
                        <th v-for="(label, i) in values" :key="'t-' + i" class=" px-2 py-2 text-center">
                            {{ label }}
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
            backgroundColor: 'red',
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
            label: 'Target Line (200)',
            data: Array(props.values.length).fill(200),
            borderColor: 'red',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: 'Limit Line (300)',
            data: Array(props.values.length).fill(230),
            borderColor: 'green',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: 'Max Line (380)',
            data: Array(props.values.length).fill(280),
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
