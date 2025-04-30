<template>
    <span class="text-white">{{ text }}</span>
</template>

<script>
    export default {
    name: "Title_Text",
    props: {
        text: {
            type: String,
            required: true
        }
    }
};
</script>