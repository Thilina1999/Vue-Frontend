<template>
  <div class="text-white text-md font-mono">
    {{ currentTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Function to pad single digits
const pad = (n) => (n < 10 ? '0' + n : n)

// Function to format the date
const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // Months are 0-indexed
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

// Define reactive variable for current time
const currentTime = ref(formatDateTime(new Date()))

// Function to update the current time
const updateTime = () => {
  currentTime.value = formatDateTime(new Date())
}

// Set up the timer when the component is mounted
onMounted(() => {
  const timer = setInterval(updateTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
})
</script>
