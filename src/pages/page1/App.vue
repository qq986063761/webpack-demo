<template>
  <div id="app">
    <img :src="require('@/pages/page1/img/2.jpg').default">
  </div>
</template>

<script>
  import { getData } from '@/common/utils.js'
  export default {
    mounted() {
      getData()
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