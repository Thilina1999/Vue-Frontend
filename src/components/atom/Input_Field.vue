<template>
    <div>
        <form class="w-full">
            <div class="input">
                <input :type="input"
                    class="block w-full p-3 text-md text-white rounded-sm dark:bg-[#212121] dark:placeholder-white dark:text-white"
                    :placeholder="text" v-model="searchValue" @input="emit('update:modelValue', searchValue)"
                    required />
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
    input: {
        type: String,
        required: true
    },
    modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])

const searchValue = ref(props.modelValue || '')
</script>
