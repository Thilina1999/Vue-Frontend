<template>
  <h1
    class="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl dark:text-white"
  >
    {{ title }}
  </h1>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
