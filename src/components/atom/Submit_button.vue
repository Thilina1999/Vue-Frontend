<template>
    <div>
        <form class="w-full">
            <div class="justify-end">
                <button type="button" @click="handleClick" :disabled="disabled"
                    class="flex items-center font-semibold rounded-sm p-2 transition-transform duration-300" :class="[
                        disabled
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-[#113f66] text-white cursor-pointer hover:scale-102'
                    ]">
                    <component :is="icon" class="h-8 w-8 mr-2" />
                    {{ text }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>

defineProps({
    handleClick: {
        type: Function,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    icon: {
        type: [Object, Function],
        required: true
    },
    disabled: {
        type: Boolean,
    }
})
</script>
