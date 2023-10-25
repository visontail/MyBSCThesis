<template>
  <div id="app">
    <MenubarComponent />
    <router-view />
  </div>
  </template>
  
  <script>
  import MenubarComponent from './components/MenubarComponent.vue';
  
  export default {
    name: 'WebApp',
    components: {
    MenubarComponent,
}
  }
  </script>

