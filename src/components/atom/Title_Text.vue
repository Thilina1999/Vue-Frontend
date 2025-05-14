<template>
  <span class="text-white">{{ text }}</span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>
