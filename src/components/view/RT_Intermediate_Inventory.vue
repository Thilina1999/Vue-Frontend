<template>
  <div class="element">
    <br />
    <div class="flex items-center space-x-4">
      <Title title="リアルタイム中間在庫" />
      <Title_Text class="text-lg" text="最終更新日時" />
      <TimeFunction class="text-lg" />
      <Title_Text class="text-lg" text="更新頻度:" />
    </div>
    <br />
    <RT_Inventory_Navbar />
    <br />
    <RT_Inventory_Tb :tableData="tableData" />

  </div>
</template>

<script>
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import TimeFunction from '../molecules/TimeFunction.vue';
import RT_Inventory_Tb from '../organisms/RT_Inventory_Tb.vue';
import RT_Inventory_Navbar from '../organisms/RT_Inventory_Navbar.vue';

export default {
  name: "RT_Intermediate_Inventory",
  components: {
    Title,
    Title_Text,
    TimeFunction,
    RT_Inventory_Tb,
    RT_Inventory_Navbar
  },
  data() {
    return {
      tableData: [
        {
          ASSY品番: "1144780012",
          SUBASSY品番: "4486000012",
          メーカ: "GUSTO",
          出荷区分: "国内・市販",
          気密検査: 0,
          SCU: 0,
          水蒸気検査: 0,
          特性検査: 0,
          特性検査端数品: 2,
          アクセサリ: 0,
          FA: 13,
          FA端数品: 0,
          外観検査: 1,
          更新日時: "24:19.8"
        },
        {
          ASSY品番: "1144780022",
          SUBASSY品番: "4486000022",
          メーカ: "GUSTO",
          出荷区分: "市販",
          気密検査: 0,
          SCU: 0,
          水蒸気検査: 0,
          特性検査: 0,
          特性検査端数品: 4,
          アクセサリ: 0,
          FA: 0,
          FA端数品: 0,
          外観検査: 5,
          更新日時: "24:19.8"
        },
        {
          ASSY品番: "1144780033",
          SUBASSY品番: "4486000033",
          メーカ: "GUSTO",
          出荷区分: "国内・市販",
          気密検査: 0,
          SCU: 0,
          水蒸気検査: 0,
          特性検査: 0,
          特性検査端数品: 0,
          アクセサリ: 0,
          FA: 3,
          FA端数品: 0,
          外観検査: 0,
          更新日時: "24:19.8"
        },
        {
          ASSY品番: "1144780044",
          SUBASSY品番: "4486000044",
          メーカ: "TANAKA",
          出荷区分: "輸出",
          気密検査: 1,
          SCU: 2,
          水蒸気検査: 1,
          特性検査: 1,
          特性検査端数品: 0,
          アクセサリ: 3,
          FA: 8,
          FA端数品: 1,
          外観検査: 2,
          更新日時: "25:01.2"
        },
        {
          ASSY品番: "1144780055",
          SUBASSY品番: "4486000055",
          メーカ: "NIPPON",
          出荷区分: "市販",
          気密検査: 0,
          SCU: 1,
          水蒸気検査: 0,
          特性検査: 1,
          特性検査端数品: 3,
          アクセサリ: 1,
          FA: 5,
          FA端数品: 2,
          外観検査: 4,
          更新日時: "25:07.3"
        },
        {
          ASSY品番: "1144780066",
          SUBASSY品番: "4486000066",
          メーカ: "GUSTO",
          出荷区分: "国内",
          気密検査: 1,
          SCU: 0,
          水蒸気検査: 0,
          特性検査: 0,
          特性検査端数品: 1,
          アクセサリ: 2,
          FA: 2,
          FA端数品: 0,
          外観検査: 1,
          更新日時: "25:15.9"
        },
        {
          ASSY品番: "1144780077",
          SUBASSY品番: "4486000077",
          メーカ: "HONDA",
          出荷区分: "輸出",
          気密検査: 0,
          SCU: 0,
          水蒸気検査: 0,
          特性検査: 1,
          特性検査端数品: 0,
          アクセサリ: 0,
          FA: 6,
          FA端数品: 0,
          外観検査: 3,
          更新日時: "25:20.4"
        },
        {
          ASSY品番: "1144780088",
          SUBASSY品番: "4486000088",
          メーカ: "TOYOTA",
          出荷区分: "国内・市販",
          気密検査: 0,
          SCU: 0,
          水蒸気検査: 1,
          特性検査: 0,
          特性検査端数品: 2,
          アクセサリ: 1,
          FA: 7,
          FA端数品: 1,
          外観検査: 2,
          更新日時: "25:25.1"
        },
        {
          ASSY品番: "1144780099",
          SUBASSY品番: "4486000099",
          メーカ: "SUZUKI",
          出荷区分: "市販",
          気密検査: 0,
          SCU: 1,
          水蒸気検査: 0,
          特性検査: 1,
          特性検査端数品: 1,
          アクセサリ: 0,
          FA: 4,
          FA端数品: 0,
          外観検査: 5,
          更新日時: "25:32.0"
        },
        {
          ASSY品番: "1144780100",
          SUBASSY品番: "4486000100",
          メーカ: "YAMAHA",
          出荷区分: "国内",
          気密検査: 1,
          SCU: 0,
          水蒸気検査: 1,
          特性検査: 1,
          特性検査端数品: 0,
          アクセサリ: 1,
          FA: 9,
          FA端数品: 2,
          外観検査: 0,
          更新日時: "25:38.7"
        }
      ]

    };
  }
};
</script>

<style></style>