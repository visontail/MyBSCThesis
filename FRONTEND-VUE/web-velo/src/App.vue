<template>
  <div id="app">
    <HomeComponent />
  </div>
  </template>
  
  <script>
  import HomeComponent from '@/components/HomeComponent.vue'
  
  export default {
    name: 'WebApp',
    components: {
      HomeComponent
    }
  }
  </script>