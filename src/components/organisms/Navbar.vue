<template>
  <nav class="bg-[#212121]">
    <div class="element">
      <div class="flex items-center justify-between">
        <div class="grid grid-cols-9 w-full">
          <div class="flex col-span-3 items-center justify-start">
            <Logo class="px-4" />
            <a
              class="text-white nav-link overflow-hidden whitespace-nowrap text-ellipsis block w-full"
              href="#"
            >
              NOx組付け工程在庫管理システム
            </a>
          </div>
          <div class="flex col-span-3 items-center justify-center">
            <Dropdown class="w-full p-3" />
          </div>
          <div class="flex items-center justify-end col-span-3">
            <TimeFunction class="m-2" />
            <Settings class="w-5 h-5 m-2" />
            <Help class="w-5 h-5 m-2" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Logo from "../atom/Logo.vue";
import Dropdown from "../molecules/Dropdown.vue";
import Settings from "../../../public/assets/Settings.vue";
import TimeFunction from "../molecules/TimeFunction.vue";
import Help from "../../../public/assets/Help.vue";
</script>

<style scoped>
.nav-color {
  background-color: #212121;
}
</style>
