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
    <div class="flex items-center space-x-2 flex-wrap">
        <Search class="m-2" />
        <Page_Bar class="m-2" />
    </div>
    <br />
    <RT_Inventory_Tb :getInventoryPage="getInventoryPage" />

  </div>
</template>

<script>
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import TimeFunction from '../molecules/TimeFunction.vue';
import RT_Inventory_Tb from '../organisms/RT_Inventory_Tb.vue';
import { getInventory, getInventoryManufactures, getInventoryPage } from '../../service/inventory';
import Page_Bar from '../atom/Page_Bar.vue';
import Search from '../atom/Search.vue';

export default {
  name: "RT_Intermediate_Inventory",
  components: {
    Title,
    Title_Text,
    TimeFunction,
    Page_Bar,
    Search,
    RT_Inventory_Tb,
  },
  data() {
    return {
      tableData: [],
      inventoryData: [],
      inventory_manufactures: []
    };
  },
  mounted() {
    getInventory().then(res => {
      this.tableData = res.data;
    }).catch(err => {
      console.error('Error fetching manufacturers:', err);
    })

    getInventoryManufactures().then(res =>{
      this.inventory_manufactures = res.data;
    }).catch(err =>{
      console.error('Error extracting data', err);
    })

  },
  methods: {
  handleSelection(option) {
    console.log('Selected shipping class:', option)
    // null means reset
  },
  async getInventoryPage(page, per_page) {
    try {
      const res = await getInventoryPage(page, per_page);
      return res; // return the full API response (with `data` and `meta`)
    } catch (err) {
      console.error('Error fetching paginated inventory:', err);
      return {
        data: [],
        meta: {
          page: 1,
          per_page: per_page,
          total_items: 0,
          total_pages: 1
        }
      };
    }
  },
}
};
</script>

<style></style>