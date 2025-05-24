<template>
    <div class="scrollbar-top-wrapper">
        <div v-if="barCount * barWidth > 0" class="chart-container overflow-x-auto pl-8 pr-1" :style="{ minWidth: `${barCount * barWidth}px` }">
            <table class="w-full table-auto border-separate border rounded-sm bg-white text-black text-sm">
                <thead>
                    <tr class="bg-gray-500">
                        <th v-for="(label, i) in labels" :key="i" class="w-20 px-2 py-4 text-center text-wrap">
                            {{ label }}
                        </th>
                    </tr>
                    <tr class="bg-red-600">
                        <th v-for="(label, i) in values" :key="'t-' + i" class=" px-2 py-4 text-center">
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

const labels = [
    '9/24 0:00', '9/24 1:00', '9/24 2:00', '9/24 3:00', '9/24 4:00',
    '9/24 5:00', '9/24 6:00', '9/24 7:00', '9/24 8:00', '9/24 9:00',
    '9/24 10:00', '9/24 11:00', '9/24 12:00', '9/24 13:00', '9/24 14:00',
    '9/24 15:00', '9/24 16:00', '9/24 1:00', '9/24 2:00', '9/24 3:00', '9/24 4:00',
    '9/24 5:00', '9/24 6:00', '9/24 7:00', '9/24 8:00', '9/24 9:00',
    '9/24 10:00', '9/24 11:00', '9/24 12:00', '9/24 13:00', '9/24 14:00',
    '9/24 15:00', '9/24 16:00'
]
const values = [179, 209, 209, 209, 209, 209, 209, 209, 149, 119, 60, 60, 60, 90, 60, 120, 180, 209, 209, 209, 209, 209, 209, 209, 149, 119, 60, 60, 60, 90, 60, 120, 180]

const barCount = labels.length
const barWidth = 90 // try 30–50 depending on spacing you want

const chartData = {
    labels,
    datasets: [
        {
            type: 'bar',
            label: 'Output',
            data: values,
            backgroundColor: 'red',
            borderSkipped: false,
            barThickness: 50
        },
        {
            type: 'line',
            label: 'Reference Points',
            data: values,
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
            data: Array(values.length).fill(200),
            borderColor: 'red',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: 'Limit Line (300)',
            data: Array(values.length).fill(230),
            borderColor: 'green',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            pointRadius: 0
        },
        {
            type: 'line',
            label: 'Max Line (380)',
            data: Array(values.length).fill(280),
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
