<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
     return {
      name: 'app'
    }
  }
 }
</script>

<style>
  body {
    overflow-x: hidden; 
  }
  * { 
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
  }

  a, span  {
    text-decoration: none;
    font-size: 14px;
  }
</style>
