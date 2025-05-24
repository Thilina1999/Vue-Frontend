<template>
    <table class="table-auto border-separate border rounded-sm bg-white text-black text-sm mr-2">
        <thead>
            <tr class="bg-gray-500">
                <th class="px-6 py-4 text-center">{{ header }}</th>
            </tr>
            <tr class="bg-gray-300">
                <th class="px-6 py-4 text-center">{{ number }}</th>
            </tr>
        </thead>
    </table>
</template>

<script setup>
defineProps({
  header: {
    type: String,
    required: true
  },
    number: {
    type: String,
    required: true
  }
})
</script>