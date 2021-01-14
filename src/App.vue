<template>
  <div id="app">
    <header>
     <!-- <div class="title">{{title}}</div> -->
      <nav-menu></nav-menu>
    </header>

    <section class="main-content w-50 mx-auto">
     <!-- <main-navigation></main-navigation>-->
      <router-view/>
          <!-- <windows-list></windows-list>-->
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import MainNavigation from './components/MainNavigation.vue';
import NavMenu from './components/NavMenu.vue';
import WindowsList from './components/window/WindowsList.vue';

import Toasted from 'vue-toasted'
Vue.use(Toasted,{
  iconPack : 'material' 
})
export default {
  name: 'App',
  components: {
    MainNavigation,
    NavMenu,
    WindowsList,
    
  },
  data: function() {
    return {
      title: 'My App Title'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
