<template>
    <div ref="map" class="map"></div>
</template>

<script>

/* import MarkerComponent from './MarkerComponent.vue'; */

// variables for GoogleMaps API - maps's style sheet, marker's icon
let style_sheet = [
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]



/* global google */ // <- solving google is not defined error
export default {
  name: 'GoogleMap',
  data() {
    return {
      map: null,
      marker: null,
      apiKey: 'AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc'
    };
    
  },
  // this runs when the web app is loaded
  mounted() {
    this.initMap();
  },
  methods: {
    // Function for initializing Google Map
    initMap() {
      // load Google Maps API via a script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      // using create map function to pass map's and marker's variables
      script.onload = this.createMap;
      document.head.appendChild(script);
    },
    createMap() {
      // Create a map centered at a specific location (Hungary)
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 47.16249, lng: 19.503304},
        zoom: 7,
        styles: style_sheet
      });
    },
  }
};
</script>

<style>

.map {
  width: 99vw;
  height: 100vh;
}

</style>
