<template>
    <div>
        <form class="w-full">
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-1 pointer-events-none">
                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <h1 class="text-white block w-full p-3 ps-10 text-lg font-semibold">{{ text }}</h1>
            </div>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
})
</script>
