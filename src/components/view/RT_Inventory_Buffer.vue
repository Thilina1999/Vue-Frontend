<template>
    <div class="element">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="リアルタイム中間在庫余力日数" />
            <Title_Text class="text-lg" text="最終更新日時" />
            <TimeFunction class="text-lg" />
            <Title_Text class="text-lg" :text="`更新頻度:  分`" />
            <button type="button">
                <Refresh class="h-6 w-6 cursor-pointer" />
            </button>
        </div>
        <br />
        <div class="grid grid-cols-8 items-center gap-3 flex-wrap">
            <div class="col-span-1">
                <Range_Filter />
            </div>
            <div class="col-span-3">
                <Page_Bar_Placholder class="w-full" text="Hello" />
            </div>
            <div class="col-span-3">
                <Page_Bar_Placholder class="w-full" text="Hello" />
            </div>

        </div>
        <div class="grid grid-cols-8 pt-4 items-center gap-3 flex-wrap">
            <div class="col-span-1">
                <Search_Title />
            </div>
            <div class="col-span-2">
                <Search text="品番"/>
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" text="メーカ" />
            </div>
            <div class="col-span-2">
                <Page_Bar class="w-full" text="出荷区分" />
            </div>
            <div class="flex col-span-1 justify-end">
                <Csv_Icon />
            </div>
        </div>
        <br />
        <RT_Buffer_Tb />

    </div>

</template>

<script setup>
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import TimeFunction from '../molecules/TimeFunction.vue';
import Refresh from '../../../public/assets/Refresh.vue';
import Search_Title from '../atom/Search_Title.vue'
import Range_Filter from '../atom/Range_Filter.vue';
import Search from '../atom/Search.vue';
import Page_Bar from '../atom/Page_Bar.vue';
import Csv_Icon from '../atom/Csv_Icon.vue';
import Page_Bar_Placholder from '../atom/Page_Bar_Placholder.vue';
import RT_Buffer_Tb from '../organisms/RT_Buffer_Tb.vue';

</script>
