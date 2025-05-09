<template>
  <nav class="bg-[#212121]">
    <div class="element">
      <div class="relative flex h-16 items-center justify-between">
        <div class="grid grid-cols-3 w-full">
          <div class="flex items-center justify-start">
            <Logo class="px-4" />
            <a class="text-white nav-link overflow-hidden whitespace-nowrap text-ellipsis block w-full" href="#">
              NOx組付け工程在庫管理システム
            </a>
          </div>
          <div class="flex items-center justify-start">
            <Dropdown />
          </div>
          <div class="flex items-center justify-end">
            <TimeFunction class="m-2" />
            <Settings class="w-5 h-5 m-2" />
            <Help class="w-5 h-5 m-2" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "../atom/Logo.vue";
import Dropdown from "../molecules/Dropdown.vue";
import Settings from "../../../public/assets/Settings.vue"
import TimeFunction from "../molecules/TimeFunction.vue";
import Help from "../../../public/assets/Help.vue";

export default {
  name: "NavBar",
  components: {
    Logo,
    Dropdown,
    Settings,
    TimeFunction,
    Help
  },
};
</script>

<style>
.nav-color {
  background-color: #212121;
}
</style>
