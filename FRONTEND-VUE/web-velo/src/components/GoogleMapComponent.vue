<template>
    <div ref="map" class="map"></div>
</template>

<script>

// variables for GoogleMaps API
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
let icon = {
    path : "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
    fillColor: "#E1EF79",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#000000",
    scale: 0.03,
  }

/* global google */
export default {
  name: 'GoogleMap',
  data() {
    return {
      map: null,
      marker: null,
      apiKey: 'AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc'
    };
    
  },
  mounted() {
    this.initMap();
  },
  methods: {

    initMap() {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      script.onload = this.createMap;
      document.head.appendChild(script);
    },
    createMap() {
      // Create a map centered at a specific location
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 47.16249, lng: 19.503304},
        zoom: 7,
        styles: style_sheet
      });

      // Add a marker to the map
      this.marker = new google.maps.Marker({
        position: { lat: 46.7108, lng: 17.2474 },
        map: this.map,
        icon: icon,
        title: 'Marker Title'
      });
    }
  }
};
</script>

<style>

.map {
  width: 90vw;
  height: 90vh;
}
</style>
