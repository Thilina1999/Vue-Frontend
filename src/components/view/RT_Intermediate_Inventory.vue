<template>
  <div class="element">
    <br />
    <div class="flex items-center space-x-4">
      <Title title="リアルタイム中間在庫" />
      <Title_Text class="text-lg" text="最終更新日時" />
      <TimeFunction class="text-lg" />
      <Title_Text class="text-lg" text="更新頻度:" />
    </div>

  </div>
</template>

<script>
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import TimeFunction from '../molecules/TimeFunction.vue';

export default {
  name: "RT_Intermediate_Inventory",
  components: {
    Title,
    Title_Text,
    TimeFunction
  },
};
</script>

<style></style>