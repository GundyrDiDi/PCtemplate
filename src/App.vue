<template>
  <div id="app">
    <div>
      <i class="fa fa-user"></i>
      <theme-picker></theme-picker>
    </div>
  </div>
</template>

<script>
import ThemePicker from './components/ThemePicker'
import Vue from 'vue'
Vue.component('theme-picker', ThemePicker)
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
