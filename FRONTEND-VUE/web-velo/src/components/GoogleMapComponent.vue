<template>
  <ChartComponent :hidden="showChart" :selectedMarkerID="selectedMarkerID" :hourlyDataArray="hourlyDataArray"
    :dailyDataArray="dailyDataArray" :monthlyDataArray="monthlyDataArray" />
    <div :hidden="showChart" id="close-btn" @click="reloadPage">
      <div id="x-sign">X</div>
    </div>
  <div ref="mapDiv" id="mapDiv" style="width:100vw; height: 100vh;z-index: 1;"></div>
</template>


<script lang="js">
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader';

import StationAPI from '../services/StationAPI.js';
import MeasureAPI from '../services/MeasureAPI';
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
  data() {
    return {
      positionsArray: [],
      selectedMarkerID: 0,
      showChart: true,
      hourlyDataArray: [],
      dailyDataArray: [],
      monthlyDataArray: [],
    };
  },
  methods: {
    async loadPositions() {
      try {
        const response = await StationAPI.getMarkerData();
        this.positionsArray = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    reloadPage(){
      location.reload();
    },
    async loadMarkers(map) {
      try {
        const positionsArray = this.positionsArray
        //  selecting each Marker's data (id, name, positions(latitude, longitude))
        for (const pos of positionsArray) {
          const id = pos.StationID;
          const name = pos.StationName;
          const lat = parseFloat(pos.posLatitude);
          const lng = parseFloat(pos.posLongitude);
          const vis = parseInt(pos.isVisible);
          if (vis === 1) {
            //  load Measurement statistics data for each Station/Marker using 'StationID' into a 'statsArray'
            let statsArray = [];
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
            this.hourlyDataArray.push({ id, name, hourlyData });
            const dailyData = Average.groupByDaily(statsArray);
            this.dailyDataArray.push({ id, name, dailyData });
            const MonthlyData = Average.groupByMonthly(statsArray);
            this.monthlyDataArray.push({ id, name, MonthlyData });
            const content = `
            <div id="content-tab">
              <div id="stat-box">
                <h2>${name}</h2>
                <p id="cord">(${lat}, ${lng})</p>
                <h4>Bike Count Summary</h4>
                <p>Today: <span class="highlight">${sumToday}</span></p>
                <p>This Year: <span class="highlight">${sumThisYear}</span></p>
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
            marker.addListener('click', () => {
              this.selectedMarkerID = marker.id;
              this.showChart = false;
            });
            clickMarker(map, marker);
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    },
    redirectToHomePage() {
      console.log('Redirecting to home page and refreshing...');
      window.location.reload();
    }
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

};

</script>

<style scoped>
#close-btn {
  background-color: #313b4b;
  border-radius: 10px;
  position: absolute;
  top: 60px;
  right: 40%;
  z-index: 999;
  cursor: pointer;
  font-size: 20px;
  color: wheat;
  height: 30px;
  width: 30px;
}

@media (max-width: 600px) {
  #close-btn {
    right: 36%;
  }
}
@media (min-width: 600px) and (max-width: 1000px) {
  #close-btn {
    right: 40%;
  }
}
@media (min-width: 1000px) and (max-width: 1600px) {
  #close-btn {
    right: 42%;
  }
}
</style>