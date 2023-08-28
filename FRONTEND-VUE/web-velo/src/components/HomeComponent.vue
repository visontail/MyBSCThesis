<template>
  
  <div id="map">
    <GoogleMapComponent />
  </div>

</template>
  
  <script>
  import GoogleMapComponent from '@/components/GoogleMapComponent.vue'
  
  export default {
    name: 'MapApp',
    components: {
      GoogleMapComponent
    }
  }
  </script>