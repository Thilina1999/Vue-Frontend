<template>
    <div class="scrollbar-top-wrapper">
        <div class="chart-container">
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
    '9/24 15:00', '9/24 16:00'
]
const values = [179, 209, 209, 209, 209, 209, 209, 209, 149, 119, 60, 60, 60, 90, 60, 120, 180]

const chartData = {
    labels,
    datasets: [
        {
            type: 'bar',
            label: 'Output',
            data: values,
            backgroundColor: 'red',
            borderSkipped: false
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
                color: '#000',
                autoSkip: false,
                maxRotation: 90,
                minRotation: 45
            },
            grid: {
                display: false
            }
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 300,
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


