<template>
  <h2>WebVelo</h2>
  <div id="menubar"></div>
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