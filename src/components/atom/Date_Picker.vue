<template>
  <div class="w-full ">
    <label class="block text-sm text-white">{{ text }}</label>
    <VueDatePicker
      v-model="selectedDate"
      :input-class-name="'w-full rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const selectedDate = ref(null)

const props = defineProps({
    text: String,
    modelValue: String
})
</script>
