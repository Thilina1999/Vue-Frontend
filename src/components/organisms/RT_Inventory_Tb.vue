<template>
    <div class="overflow-x-auto p-1">
      <table class="w-full table-auto border-separate border rounded-sm  bg-white border-gray-500 text-white">
        <thead>
          <tr class="text-black h-12 text-sm">
            <th class="summary-row border bg-amber-400 border-gray-300 text-left px-2 py-1" colspan="4">工程合計</th>
            <th class="summary-row border bg-gray-300 border-gray-300 px-2 py-1" v-for="i in 10" :key="i">0</th>
          </tr>
          
          <tr class="bg-gray-500 h-12 text-sm">
            <th class="border border-gray-300 px-2 py-1">メーカー</th>
            <th class="border border-gray-300 px-2 py-1">ASSY品番</th>
            <th class="border border-gray-300 px-2 py-1">SUBASSY品番</th>
            <th class="border border-gray-300 px-2 py-1">出荷区分</th>
            <th class="border border-gray-300 px-2 py-1">気密検査</th>
            <th class="border border-gray-300 px-2 py-1">SCU</th>
            <th class="border border-gray-300 px-2 py-1">水蒸気検査</th>
            <th class="border border-gray-300 px-2 py-1">特性検査</th>
            <th class="border border-gray-300 px-2 py-1">特性検査端数品</th>
            <th class="border border-gray-300 px-2 py-1">アクセサリ</th>
            <th class="border border-gray-300 px-2 py-1">FA</th>
            <th class="border border-gray-300 px-2 py-1">FA端数品</th>
            <th class="border border-gray-300 px-2 py-1">外観検査</th>
            <th class="border border-gray-300 px-2 py-1">品番合計</th>
          </tr>
        </thead>
  
        <tbody>
        <tr v-for="(row, index) in tableData" :key="index" class="bg-gray-300 text-black text-sm">
          <td class="border border-gray-300 px-2 py-1">{{ row.メーカ }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.ASSY品番 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.SUBASSY品番 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.出荷区分 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.気密検査 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.SCU }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.水蒸気検査 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.特性検査 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.特性検査端数品 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.アクセサリ }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.FA }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.FA端数品 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.外観検査 }}</td>
          <td class="border border-gray-300 px-2 py-1">{{ row.更新日時 }}</td>
        </tr>
      </tbody>

      </table>
    </div></template>

<script>
export default {
  name: "Rt_Inventory_Tb",
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
        }
      ]
    };
  }
};
</script>
