<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (!sessionStorage.getItem('searchPrompt')) {
      sessionStorage.setItem('searchPrompt', 'false')
    }
  }
}
</script>

<!--<style>-->
<!--#app {-->
<!--font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!-- -webkit-font-smoothing: antialiased;-->
<!-- -moz-osx-font-smoothing: grayscale;-->
<!--text-align: center;-->
<!--color: #2c3e50;-->
<!--/*margin-top: 60px;*/-->
<!--}-->
<!--</style>-->
<style>
  @import "./assets/global.css";
</style>
