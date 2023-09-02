<template>
  <GoogleMap
    api-key="AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="4"
  >
    <MarkerCluster>
      <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
    </MarkerCluster>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { GoogleMap, Marker, MarkerCluster },
  setup() {
    const center = { lat: 47.16249, lng: 19.503304 }
    const locations = [
      {
        lat: 47.2385,
        lng: 18.6349
      },
      {
        lat: 47.2392,
        lng: 16.9739
      },
      {
        lat: 46.1113,
        lng: 18.1848
      },
      { lat: 45.9522, lng: 18.6671 },
    ]

    return { center, locations }
  }
})
</script>

<!-- 

<template>
    <div ref="map" class="map"></div>
</template>


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

let icon = {
    path : "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
    fillColor: "#E1EF79",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#000000",
    scale: 0.03,
}


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
        this.getPos().then(() => {
          this.fetchPosData();
        });
        
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
                center: { lat: 47.16249, lng: 19.503304 },
                zoom: 7,
                styles: style_sheet
            });
        },
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
                    const contentString =

    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Uluru",
  });
                    const marker = new google.maps.Marker({
                        id: id,
                        position: { lat, lng },
                        map: this.map,
                        icon: icon,
                        title: name,
                    });
                    this.clickMarker(marker, infowindow)
                    };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        clickMarker(marker, infowindow) {
            // Attach click event listener to the marker
            marker.addListener('click', () => {
                this.map.setZoom(15);
                this.map.setCenter(marker.getPosition());
                console.log("Teszt");
                infowindow.open({
      anchor: marker,
      map: this.map
    });
            });
        }
    }
};
</script>

<style>

.map {
  width: 99vw;
  height: 100vh;
}

.gm-style-iw {
  position: absolute;
  min-width: 100vw;
  width: 100vw !important;
  max-width: 100vw !important;
  height: 98vh;
  max-height: 100vh !important;
  background: none !important;
  transform: translate(-50%, -50%);
  box-shadow: none !important;
}

.gm-style-iw-d {
position: absolute;
  top: 0;
  right: 0;
  min-width: 400px !important;
  max-width: 400px !important;
  background: red;
  min-height: 100vh;
}

</style>
 -->
