<template>
  <div id="app">
    <img :src="require('@/img/img.jpg').default">
  </div>
</template>

<script>
  import img from '@/img/img.jpg'
  export default {
    data() {
      return {
        img
      }
    }
  }
</script>

<style lang="scss">
  #app {
    box-sizing: border-box;
    img {
      width: 300px;
    }
  }
</style>