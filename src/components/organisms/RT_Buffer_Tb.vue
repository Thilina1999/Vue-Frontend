<template>
    <div class="overflow-x-auto p-1 pb-6">
        <table class="w-full table-auto border-separate border rounded-sm  bg-white border-gray-500 text-white">
            <thead class="bg-white">
                <!-- First row: main headers -->
                <tr class="bg-gray-500 text-sm text-white">
                    <th class="px-2 py-2" rowspan="2">品番</th>
                    <th class="px-2 py-2" rowspan="2">メーカ</th>
                    <th class="px-2 py-2" rowspan="2">出荷区分</th>
                    <th class="px-2 py-2" rowspan="2">工程内在庫</th>
                    <th class="px-2 py-2" rowspan="2">入庫実績</th>
                    <th class="px-2 py-2" rowspan="2">出荷前在庫</th>
                    <th class="px-1 py-1 text-center" colspan="7">日別計画数</th>
                    <th class="px-2 py-2" rowspan="2">余力日数</th>
                </tr>
                <tr class="bg-gray-500 text-sm text-white">
                    <th class="px-1 py-1">11/8(金)</th>
                    <th class="px-1 py-1">11/9(土)</th>
                    <th class="px-1 py-1">11/10(日)</th>
                    <th class="px-1 py-1">11/11(月)</th>
                    <th class="px-1 py-1">11/12(火)</th>
                    <th class="px-1 py-1">11/13(水)</th>
                    <th class="px-1 py-1">11/14(木)</th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script setup>

</script>
