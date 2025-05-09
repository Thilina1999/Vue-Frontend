<template>
        <div class="flex items-center space-x-2 flex-wrap">
                <Search class="m-2" />
                <Page_Bar class="m-2" />
        </div>
</template>

<script>
import Page_Bar from '../atom/Page_Bar.vue';
import Search from '../atom/Search.vue';

export default {
    name: "RT_Inventory_Navbar",
    components: {
        Search,
        Page_Bar
    },
};
</script>