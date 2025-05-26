<template>
    <div class="flex items-center">
        <input 
            type="radio" 
            :name="name" 
            :id="id"
            :value="value"
            :checked="modelValue === value"
            @change="$emit('update:modelValue', value)"
            class="accent-black h-4 w-4 rounded-full border-black focus:ring-0" 
        />
        <label :for="id" class="text-sm text-black ms-2">{{ text }}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])
</script>