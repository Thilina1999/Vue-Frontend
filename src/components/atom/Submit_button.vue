<template>
    <div>
        <form class="w-full">
            <div class="justify-end">
                <button type="button" @click="handleClick"
                    class="flex items-center text-white cursor-pointer font-semibold rounded-sm  p-2.5 bg-[#113f66] transition-transform duration-300 hover:scale-102">
                    CSV出力
                    <Csv class="h-8 w-8 text-white" />
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
