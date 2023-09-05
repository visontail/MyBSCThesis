<template>
  <div ref="mapDiv" id="mapDiv" style="width:100vw; height: 100vh;"></div>
</template>


<script>
/* eslint-disable no-undef */
import { onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

import StationAPI from '../services/StationAPI.js';
import { clickMarker } from './MarkerComponent.vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc';

const style_sheet = [
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

const icon = {
    path : "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
    fillColor: "#E1EF79",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#000000",
    scale: 0.03,
}


export default {
  name: 'GMap',
  setup() {
    let positions = []
    const loadPositions = async () => {
      try{
        const response = await StationAPI.getPositions()
        positions = response.data
      }
      catch(err){
        console.log(err)
      }
    }
    loadPositions()
    const loadMarkers = async (map) => {
      try{
        for (const pos of positions) {
          const id = pos.StationID;
          const name = pos.StationName;
          const lat = parseFloat(pos.posLatitude);
          const lng = parseFloat(pos.posLongitude);
          const marker = new google.maps.Marker({
            id: id,
            title: name,
            position: { lat, lng },
            map: map,
            icon: icon
          });
          //console.log(marker);
          clickMarker(map, marker);
        };
      }
      catch(err){
        console.log(err);
      }
    }

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
    const mapDiv = ref(null)

    onMounted(async () => {
      await loader.load();

      try {
        if (mapDiv.value) {
          let map = new google.maps.Map(mapDiv.value, {
            center: { lat: 47.16249, lng: 19.503304 },
            zoom: 7,
            stlye: style_sheet
          });
          loadMarkers(map)
        } else {
          throw new Error('mapDiv is null');
        }
      } catch (error) {
        console.error(error.message);
      }
    });

    return { 
      mapDiv,
      positions
    };
  }
}

</script>

<!-- 

<script>


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
  import axios from 'axios'
const apiUrl = 'http://localhost:8080';

/* global google */ // <- solving google is not defined error
export default {
    // this runs when the DOM elements are mounted
    mounted() {
        this.getPos().then(() => {
          this.fetchPosData();
        });  
    },
    methods: {
        // Function for initializing Google Map
        // Fumction for getting Stations' positions (lat, lng), ID, and name
        async getPos() {
          try {
              const response = await axios.get(`${apiUrl}/pos`);
              this.marker = response.data;
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
          }
        },
        async  fetchPosData() {
            try {
                const positions = this.marker;
                for (const pos of positions) {
                    const id = pos.StationID;
                    const name = pos.StationName;
                    const lat = parseFloat(pos.posLatitude);
                    const lng = parseFloat(pos.posLongitude);
        });
                    const marker = new google.maps.Marker({
                        id: id,
                        position: { lat, lng },
                        map: this.map,
                        icon: icon,
                        title: name,
                    });
                    this.clickMarker(marker)
                    };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        clickMarker(marker) {
            // Attach click event listener to the marker
            marker.addListener('click', () => {
                this.map.setZoom(15);
                this.map.setCenter(marker.getPosition());
                console.log("Teszt");
            });
        }
    }
};
</script>
 -->
