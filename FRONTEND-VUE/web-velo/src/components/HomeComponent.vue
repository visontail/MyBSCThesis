<template>
  <MenubarComponent />
  <GoogleMapComponent />

</template>
  
  <script>
  import GoogleMapComponent from '@/components/GoogleMapComponent.vue';
  import MenubarComponent from '@/components/MenubarComponent.vue';
  
  export default {
    name: 'MapApp',
    components: {
      GoogleMapComponent,
      MenubarComponent
    }
  }
  </script>