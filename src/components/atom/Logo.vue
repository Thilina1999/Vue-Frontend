<template>
<img :src="logo" alt="Logo" style="height: 30px; margin-right: 1rem;" />
</template>

<script>
import logo from '/assets/Logo.png'

export default {
  name: "Logo",
  data() {
    return {
      logo
    }
}
};
</script>