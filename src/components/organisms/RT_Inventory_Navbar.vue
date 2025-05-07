<template>
        <div class="grid grid-cols-3 w-full">
            <div class="flex items-center justify-start">
                <Search />
            </div>
            <div class="flex items-center justify-start">
                <Page_Bar />
                <Search class="px-2" />
            </div>
            <div class="flex items-center justify-start">
                <Search />
            </div>
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