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
    <RT_Inventory_Navbar   :options="['国内', '国内・市販', '市販', '海外']"
    @update:selection="handleSelection" />
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
import { getInventory } from '../../service/inventory';

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
      tableData: []
    };
  },
  mounted() {
    getInventory().then(res => {
      this.tableData = res.data;
    }).catch(err => {
      console.error('Error fetching manufacturers:', err);
    })
  },
  methods: {
  handleSelection(option) {
    console.log('Selected shipping class:', option)
    // null means reset
  }
}
};
</script>

<style></style>