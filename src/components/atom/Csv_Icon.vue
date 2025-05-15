<template>
    <div>
        <form class="w-full">
            <div class="relative flex justify-end">
                <button type="button" @click="handleClick"
                    class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer">
                    <h1 class="text-white text-end pr-4 block w-full p-1 text-lg font-semibold">CSV出力</h1>
                    <Csv class="h-8 w-8 text-blue-500 hover:text-blue-700 transition" />
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import Csv from '../../../public/assets/Csv.vue'

defineProps({
    handleClick: {
        type: Function,
        required: true,
    }
})
</script>
