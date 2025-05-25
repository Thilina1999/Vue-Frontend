<template>
  <div class="w-full">
    <label class="block text-sm text-white">{{ text }}</label>
    <VueDatePicker
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :input-class-name="'w-full rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'"
    />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
    text: String,
    modelValue: [Date, String, null]
})

const emit = defineEmits(['update:modelValue'])
</script>