<template>
  <div id="app">
    <img :src="require('@/img/img.jpg').default">
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  #app {
    box-sizing: border-box;
    img {
      width: 300px;
    }
  }
</style>