<template>
  <nav class="bg-[#212121]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <Logo />
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '../atom/Logo.vue';

export default {
  name: "NavBar",
  components: {
    Logo
  }

};
</script>

<style>
.nav-color {
  background-color: #212121;
}
</style>
