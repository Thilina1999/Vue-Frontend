<template>
    <div class="relative w-full">
        <label :class="[
            'absolute left-3 transition-all duration-200 pointer-events-none',
            (searchValue || isFocused)
                ? 'text-xs top-2 bg-[#212121] px-1 text-gray-400'
                : 'text-base top-1/2 -translate-y-1/2 text-white'
        ]">
            {{ text }}
        </label>
        <input id="floating-input" type="search"
            class="block w-full pt-6 pb-2 px-3 text-lg text-white bg-[#212121] rounded-sm placeholder-transparent focus:outline-none"
            @focus="handleFocus" @blur="handleBlur" v-model="searchValue" @input="handleInput" autocomplete="off"
            required />
        <transition enter-active-class="transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
            enter-from-class="opacity-0 translate-y-2 scale-[0.97] blur-[1px]"
            enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-active-class="transition-all duration-200 ease-[cubic-bezier(0.7,0,0.84,0)]"
            leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-to-class="opacity-0 translate-y-2 scale-[0.97] blur-[1px]">
            <div v-if="showDropdown && filteredOptions.length > 0"
                class="absolute z-10 w-full mt-2 bg-[#212121] dropdown-scroll rounded-sm max-h-72 overflow-auto shadow-2xl shadow-black">
                <ul>
                    <li v-for="(option, index) in filteredOptions" :key="index"
                        class="px-3 py-2 text-white hover:bg-white hover:text-black cursor-pointer"
                        @mousedown.prevent="selectOption(option)">
                        {{ option }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    modelValue: String,
    options: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue'])

const searchValue = ref(props.modelValue || '')
const isFocused = ref(false)
const showDropdown = ref(false)

const allOptions = ref(props.options)

// Filter options based on input
const filteredOptions = computed(() => {
    if (!searchValue.value) return allOptions.value
    return allOptions.value.filter(option =>
        option.toString().toLowerCase().includes(searchValue.value.toLowerCase())
    )
})

const handleFocus = () => {
    isFocused.value = true
    showDropdown.value = true
}

const handleBlur = () => {
    isFocused.value = false
    // Small timeout to allow click event on dropdown items to fire first
    setTimeout(() => {
        showDropdown.value = false
    }, 200)
}

const handleInput = () => {
    emit('update:modelValue', searchValue.value)
    showDropdown.value = true
}

const selectOption = (option) => {
    searchValue.value = option
    emit('update:modelValue', option)
    showDropdown.value = false
}

// Watch for options prop changes
watch(() => props.options, (newOptions) => {
    allOptions.value = newOptions
})

// Watch for modelValue changes from parent
watch(() => props.modelValue, (newValue) => {
    if (newValue !== searchValue.value) {
        searchValue.value = newValue
    }
})
</script>