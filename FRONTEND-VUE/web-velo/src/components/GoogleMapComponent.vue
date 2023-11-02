<template>
  <ChartComponent :hidden="showChart" :selectedMarkerID="selectedMarkerID" :hourlyDataArray="hourlyDataArray"
    :dailyDataArray="dailyDataArray" :monthlyDataArray="monthlyDataArray" />
  <div ref="mapDiv" id="mapDiv" style="width:100vw; height: 100vh;z-index: 1;"></div>
</template>


<script lang="js">
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader';

import StationAPI from '../services/StationAPI.js';
import MeasureAPI from '../services/MeasureAPI';
//  import WeatherAPI from '../services/WeatherAPI';

import Average from '../services/Average';

import ChartComponent from './ChartComponent.vue';
import { clickMarker, calcSum } from './MarkerComponent.vue';

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
  path: "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
  fillColor: "#E1EF79",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#000000",
  scale: 0.03,
}

export default {
  name: 'GMap',
  methods: {
    async loadPositions() {
      try {
        const response = await StationAPI.getMarkerData();
        this.positionsArray = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async loadMarkers(map) {
      try {
        const positionsArray = this.positionsArray
        //  selecting each Marker's data (id, name, positions(latitude, longitude))
        for (const pos of positionsArray) {
          const id = pos.StationID;
          const name = pos.StationName;
          //const img = pos.StationImg;
          const lat = parseFloat(pos.posLatitude);
          const lng = parseFloat(pos.posLongitude);
          const vis = parseInt(pos.isVisible);

          if (vis === 1) {
            //  load Measurement statistics data for each Station/Marker using 'StationID' into a 'statsArray'
            let statsArray = [];
            let hourlyDataArray = [];
            let dailyDataArray = [];
            let monthlyDataArray = [];
            let sumToday = 0;
            let sumThisYear = 0;
            const loadStats = async () => {
              try {
                // all measurement data
                const response = await MeasureAPI.getStats(id)
                statsArray = response.data
                // today's total traffic
                const sumDay = await MeasureAPI.getTodaySum(id)
                sumToday = calcSum(sumDay)
                // this year's total traffic
                const sumYear = await MeasureAPI.getYearSum(id)
                sumThisYear = calcSum(sumYear)
              }
              catch (err) {
                console.log(err);
              }
            }
            await loadStats();
            //  calculate measurement averages
            const hourlyData = Average.groupByHourly(statsArray);
            hourlyDataArray.push({ id, name, hourlyData });
            const dailyData = Average.groupByDaily(statsArray);
            dailyDataArray.push({ id, name, dailyData });
            const MonthlyData = Average.groupByMonthly(statsArray);
            monthlyDataArray.push({ id, name, MonthlyData });
            const content =`
            <div id="content">
              <h4> ${name} </h4>
              <p> cord: (${lat}, ${lng}) </p>
              <div>
                <p> Today's total traffic: ${sumToday}</p>
                <p> This year's total traffic: ${sumThisYear} </p>
              </div>
              <div>
                <h4> PICTURES </h4>
              </div> 
            </div>`; 
            const marker = new google.maps.Marker({
              id: id,
              title: name,
              position: { lat, lng },
              map: map,
              icon: icon,
              content: content
            });
            this.markers.push(marker);
            marker.addListener('click', function () {
              this.selectedMarkerID = id;
              this.showChart = false;
            }.bind(this));
            clickMarker(map, marker);
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    const loader = new Loader({ apiKey: API_KEY });
    loader.load().then(async () => {
      if (this.$refs.mapDiv) {
        const map = new google.maps.Map(this.$refs.mapDiv, {
          center: { lat: 47.16249, lng: 19.503304 },
          zoom: 7,
          style: style_sheet,
        });
        await this.loadPositions();
        await this.loadMarkers(map);
      } else {
        throw new Error('mapDiv is null');
      }
    }).catch((error) => {
      console.error(error.message);
    });
  },
  components: {
    ChartComponent,
  },
  data() {
    return {
      searchQuery: '',
      markers: [],
      positionsArray: [],
      selectedMarkerID: 0,
      showChart: true,
      hourlyDataArray: [], // Initialize as empty arrays
      dailyDataArray: [],
      monthlyDataArray: [],
    };
  },
};

</script>

<style>

</style>