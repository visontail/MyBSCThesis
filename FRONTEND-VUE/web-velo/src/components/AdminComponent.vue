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
            <input type="checkbox" :checked="station.isVisible === 1" @change="toggleVisibility(station)">
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

<style scoped>
#center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
table, tbody {
  display: flex;
  flex-direction: column;
}
tr {
  display: flex;
  align-items: center;
  gap: 5px;
}
tbody {
  gap: 10px;
  justify-content: center;
  align-items: center;
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

  
<script>
import { mapGetters } from 'vuex';
import API from '../services/API';
import StationAPI from '../services/StationAPI.js';

export default {
  data(){
    return{
      stationsArray: [],
      itemsPerPage: 10,
      currentPage: 1,
      sum: 0,
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
    },
    ...mapGetters(['userAccessToken', 'userRefreshToken'])
  },
  async mounted(){
    await this.loadStations();
    await this.getStationsNum();
  },
  methods: {
    async getStationsNum() {
      try{ 
        const response = await StationAPI.getSumStations()
        this.sum = response.data[0].row_count;
      }
      catch(err){
        console.log(err)
      }
    },
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
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.$router.push('/');
        }
        else {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            // If the error response is in JSON format.
            const errorData = await response.json()
            console.log('Error: ' + JSON.stringify(errorData.error));
          } else {
            // If the error response is plain text.
            const errorText = await response.text()
            console.error('Error:', errorText)
            // Handle the error text, e.g., display an error message.
          }
        }
      }catch (error) {
        console.error('Fetch error:', error)
      }
    },
    async generateNewToken(){
      const refreshToken = this.userRefreshToken
      try {
        const response = await API.authAPI().post('/token', {},
          {
            headers: {
              Refresh: refreshToken
            }
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          const newToken = response.data.accessToken;
          this.$store.commit('regen', newToken)
          console.log(newToken);
          return newToken;
        }
        return null; // Return null if token generation failed
      } catch (error) {
        console.error('Token generation error:', error);
        return null; // Return null in case of errors
      }
    },
    async updateStation(station, retryAttempts = 0){
      const MAX_RETRY_ATTEMPTS = 3; // Maximum number of retry attempts
      const accessToken = this.userAccessToken
      const config = {
        headers: {
          Authorization: accessToken
        }
      }
      try {
        const { StationID, StationName, posLatitude, posLongitude, isVisible } = station;
        const response = await API.dataAPI().post('/station', {
          id: StationID,
          name: StationName,
          lat: posLatitude,
          lng: posLongitude,
          vis: isVisible
        }, config)
        if (response.status === 200) {
          const data = await response.data
          console.log("update was a success",data);
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
        }
      } catch (error) {
        if (error.response && error.response.status === 400 || error.response && error.response.status === 401 ) {
          if (retryAttempts < MAX_RETRY_ATTEMPTS) {
            // Retry the update with a new token
            const newToken = await this.generateNewToken(this.refreshToken);
            if (newToken) {
              await this.updateStation(station, retryAttempts + 1);
            } else {
              console.error('Token generation failed');
            }
          } else {
            console.error('Exceeded maximum retry attempts. Unable to update.');
            await this.logout();  //logs user out
          }
        }
        console.error('Fetch error:', error)
      }
    },
    toggleVisibility(station) {
      station.isVisible = !station.isVisible; // Update isVisible property
      this.updateStation(station); // Send the updated data to the server
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