<template>
  <nav class="bg-[#212121]">
    <div class="px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-14 items-center justify-between">
        <div class="grid grid-cols-3 w-full">
          <div class="flex items-center justify-start">
            <Logo class="px-4" />
            <a class="text-white nav-link overflow-hidden whitespace-nowrap text-ellipsis block w-full" href="#">
              NOx組付け工程在庫管理システム
            </a>
          </div>
          <div class="flex items-center justify-center">
            <Dropdown />
          </div>
          <div class="text-white flex items-center justify-center">
            Column 3
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "../atom/Logo.vue";
import Dropdown from "../molecules/Dropdown.vue";

export default {
  name: "NavBar",
  components: {
    Logo,
    Dropdown

  },
};
</script>

<style>
.nav-color {
  background-color: #212121;
}
</style>
