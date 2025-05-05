<template>
    <h1
        class="mb-4 text-2xl font-extrabold leading-none tracking-tight md:text-3xl lg:text-4xl dark:text-white">
        {{ title }}
    </h1>
</template>

<script>
export default {
    name: "Title",
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>