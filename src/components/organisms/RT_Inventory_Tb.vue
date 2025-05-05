<template>
    <div class="overflow-x-auto p-1">
      <table class="w-full table-auto border-separate border border-gray-400 text-white">
        <thead>
          <tr class="bg-gray-700 text-white text-sm">
            <th class="summary-row border border-gray-300 text-left px-2 py-1" colspan="4">工程合計</th>
            <th class="summary-row border border-gray-300 px-2 py-1" v-for="i in 10" :key="i">0</th>
          </tr>
          
          <tr class="bg-gray-800 text-sm">
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
          <tr class="bg-gray-600 text-sm">
            <td class="border border-gray-300 px-2 py-1">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td class="border border-gray-300 px-2 py-1">Malcolm Lockyer</td>
            <td class="border border-gray-300 px-2 py-1">1961</td>
            <td class="border border-gray-300 px-2 py-1" colspan="11">—</td>
          </tr>
          <tr class="bg-gray-700 text-sm">
            <td class="border border-gray-300 px-2 py-1">Witchy Woman</td>
            <td class="border border-gray-300 px-2 py-1">The Eagles</td>
            <td class="border border-gray-300 px-2 py-1">1972</td>
            <td class="border border-gray-300 px-2 py-1" colspan="11">—</td>
          </tr>
          <tr class="bg-gray-600 text-sm">
            <td class="border border-gray-300 px-2 py-1">Shining Star</td>
            <td class="border border-gray-300 px-2 py-1">Earth, Wind, and Fire</td>
            <td class="border border-gray-300 px-2 py-1">1975</td>
            <td class="border border-gray-300 px-2 py-1" colspan="11">—</td>
          </tr>
        </tbody>
      </table>
    </div></template>

<script>

export default {
    name: "Rt_Inventory_Tb",
    components: {
        
    }
}
</script>