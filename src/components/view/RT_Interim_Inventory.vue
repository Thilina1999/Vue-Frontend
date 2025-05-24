<template>
    <div class="element pb-4">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="中間在庫推移" />
        </div>
        <br />
        <div class="bg-gray-300 rounded-lg p-12 pl-24">
        <RT_Bar_Chart class="" />
        </div>
        
    </div>

</template>

<script setup>
import Title from '../atom/Title.vue';
import RT_Bar_Chart from '../organisms/RT_Bar_Chart.vue';


</script>


