<template>
  <div>
    <form class="w-full">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div class="relative">
        <input type="search" id="default-search"
          class="block w-full p-3 text-lg text-white rounded-sm dark:bg-[#212121] dark:placeholder-white dark:text-white"
          :placeholder="text" v-model="searchValue" @input="emit('update:modelValue', searchValue)" required />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const searchValue = ref(props.modelValue || '')
</script>
