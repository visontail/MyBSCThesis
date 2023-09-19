<template>
 <!--  <div id="stat">
    <ChartComponent />
  </div> -->
  <div ref="mapDiv" id="mapDiv" style="width:100vw; height: 100vh;z-index: 1;"></div>
</template>


<script>
/* eslint-disable no-undef */


import { onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

import StationAPI from '../services/StationAPI.js';
import { clickMarker } from './MarkerComponent.vue';
import MeasureAPI from '../services/MeasureAPI';

import Average from '../services/Average';

const API_KEY = 'AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc';
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

//import ChartComponent from './ChartComponent.vue';


export default {
  name: 'GMap',
  setup() {
    //  load Google Maps Markers' positions to a 'positionsArray'
    let positionsArray = []
    const loadPositions = async () => {
      try{ 
        const response = await StationAPI.getMarkerData()
        positionsArray = response.data
      }
      catch(err){
        console.log(err)
      }
    }
    loadPositions()
    //  load Google Maps Markers in map
    const loadMarkers = async (map) => {
      try{
      //  selecting each Marker's data (id, name, positions(latitude, longitude))
        for (const pos of positionsArray) {
          const id = pos.StationID;
          const name = pos.StationName;
          const lat = parseFloat(pos.posLatitude);
          const lng = parseFloat(pos.posLongitude);
          //  load Measurement statistics data for each Station/Marker using 'StationID' into a 'statsArray'
          let  statsArray = [];
          const loadStats = async () => {
            try {
              const response = await MeasureAPI.getStats(id)
              statsArray = response.data
            }
            catch(err){
              console.log(err);
            }
          }
          await loadStats();
          //  calculate measurement averages
          const dailyData = Average.groupByDaily(statsArray);
          const weeklyData = Average.groupByWeekly(statsArray);
          const monthlyData = Average.groupByMontly(statsArray);

          let statContent = dailyData + weeklyData + monthlyData
          if (Average.isEmpty(statContent)) {
            statContent = `
            <h4>No Stat Data</h4>`;
          }
          //  statContent +
          const content =` 
            <div id="content">
                <h4> ${name} </h4>
                <p> (${lat}, ${lng}) </p>
                <div>
                  <p> Időjárás: 20 C </p>
                </div>
                <div>
                  <p> Mai nap össz forgalma: </p>
                  <button type="button">Váltson Havi Nézetre</button>
                  <p> Idei évi össz forgalom: 365 </p>
                </div>
                <div>
                  <h4> KÉPEK </h4>
                </div>
            ` + statContent +
            '</div>';
          const marker = new google.maps.Marker({
            id: id,
            title: name,
            position: { lat, lng },
            map: map,
            icon: icon,
            content: content
          });
          const stat = marker.content;
          //console.log(marker);
          clickMarker(map, marker, stat);
        };
      }
      catch(err){
        console.log(err);
      }
    }

    const loader = new Loader({ apiKey: API_KEY })
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
      mapDiv
    };
  },
  components: {
    //ChartComponent
  },
};
</script>
