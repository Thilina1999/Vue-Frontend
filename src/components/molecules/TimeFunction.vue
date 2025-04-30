<template>
    <div class="text-white text-md font-mono">
      {{ currentTime }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'LiveTime',
    data() {
      return {
        currentTime: this.formatDateTime(new Date()),
      };
    },
    methods: {
      pad(n) {
        return n < 10 ? '0' + n : n;
      },
      formatDateTime(date) {
        const year = date.getFullYear();
        const month = this.pad(date.getMonth() + 1); // Months are 0-indexed
        const day = this.pad(date.getDate());
        const hours = this.pad(date.getHours());
        const minutes = this.pad(date.getMinutes());
        const seconds = this.pad(date.getSeconds());
  
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      },
      updateTime() {
        this.currentTime = this.formatDateTime(new Date());
      },
    },
    mounted() {
      this.timer = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
  };
  </script>
  