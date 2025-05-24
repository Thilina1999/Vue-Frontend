<template>
    <div class="relative w-full">
        <label :class="[
            'absolute left-3 transition-all duration-200 pointer-events-none',
            (searchValue || isFocused)
                ? 'text-xs top-2 bg-[#212121] px-1 text-gray-400'
                : 'text-base top-1/2 -translate-y-1/2 text-white'
        ]" for="floating-input">
            {{ text }}
        </label>
        <input id="floating-input" type="search"
            class="block w-full pt-6 pb-2 px-3 text-lg text-white bg-[#212121] rounded-sm placeholder-transparent focus:outline-none"
            v-model="searchValue" @focus="isFocused = true" @blur="isFocused = false"
            @input="emit('update:modelValue', searchValue)" required />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    text: String,
    modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const searchValue = ref(props.modelValue || '')
const isFocused = ref(false)
</script>
