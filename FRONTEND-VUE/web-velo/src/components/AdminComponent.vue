<template>
  <div id="center-container">
  <h2 id="item">WebVelo's Administrator Page</h2>
  <p id="item">Number of Stations: {{ sum }}</p>
  <button id="item" @click="logout">Logout</button>
  </div>
    <div id="center-div">
    <table>
      <thead>
        <tr>
          <th>Station ID</th>
          <th>Station Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Visible</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(station, index) in displayedStations" :key="station.StationUid">
          <td>{{ station.StationID }}</td>
          <td>
            <input v-model="station.StationName" :key="index">
          </td>
          <td>
            <input v-model="station.posLatitude" :key="index">
          </td>
          <td>
            <input v-model="station.posLongitude" :key="index">
          </td>
          <td>
            <input type="checkbox" v-model="station.isVisible" @change="toggleVisibility(station)">
          </td>
          <td>
            <button @click="updateStation(station)">Update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="center-nav">
      <button id="item" @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span id="item" >{{ currentPage }}</span>
      <button id="item" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>
  
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import StationAPI from '../services/StationAPI.js';
import API from '../services/API'

export default {
  data(){
    return{
      stationsArray: [],
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    totalStations() {
      return this.stationsArray.length;
    },
    totalPages() {
      return Math.ceil(this.totalStations / this.itemsPerPage);
    },
    displayedStations() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.stationsArray.slice(startIndex, endIndex);
    }
  },
  async mounted(){
    await this.loadStations();
  },
  setup() {
    const store = useStore();
    const isAuthenticated = () => {return store.getters.isAuthenticated;};
    // const accessToken = () => {return store.getters.userAccessToken;};
    // const refreshToken = () => {return store.getters.userRefreshToken;};
    const data = {
  id: 24811,
  name: 'Velenc',
  lat: 47.2385,
  lng: 18.6349,
  vis: 1
};
const jdata = JSON.stringify(data)
console.log(jdata);
    const sum = ref('')
    const sumStationsNum = async () => {
      try{ 
        const response = await StationAPI.getSumStations()
        sum.value = response.data[0].row_count;
      }
      catch(err){
        console.log(err)
      }
    }
    sumStationsNum()
    return {
      sum
    }
  },
  methods: {
    async loadStations() {
      try {
        const response = await StationAPI.getStations();
        this.stationsArray = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      const refreshToken = this.$store.getters.userRefreshToken
      try {
        const response = await API.authAPI().delete('/logout', {
          headers: {
            'Refresh': refreshToken
          }
        });
        if (response.status === 200){
          console.log('done');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.$router.push('/');
        }
        else {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            // If the error response is in JSON format.
            const errorData = await response.json()
            this.messageError = 'Error: ' + JSON.stringify(errorData.error)
          } else {
            // If the error response is plain text.
            const errorText = await response.text()
            console.error('Error:', errorText)
            // Handle the error text, e.g., display an error message.
          }
        }
      }catch (error) {
        console.error('Fetch error:', error)
        this.messageError = error.response.data.error
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  }
};

</script>


<style scoped>
#center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#center-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
#center-container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#item {
  margin: 10px;
}
</style>



