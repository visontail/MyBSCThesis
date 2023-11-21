<template>
<div id="parent-container">
  <div id="center-container">
    <div id="hero-row">
      <div id="hero-column">
        <h2 >WebVelo's Administrator Page</h2>
        <p>Number of Stations: {{ sum }}</p>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </div>
  <div id="center-div">
    <table>
      <thead>
        <tr class="first-head">
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
</div>
</template>
  
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

<style scoped>
#center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#hero-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

tr {
  display: flex;
  gap: 10px;
  height: 50px;
}

tr:nth-child(even) {
  background: #1d232c;
}

tbody tr:nth-child(odd) {
  background: #272f3c;
}

.first-head {
  border-radius: 15px 15px 0px 0px;
  background: #313b4b;
  align-items: center;
}

th {
  width: 120px;
  color: #e9d2ab;
  font-weight: bold;
}

td {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #e9d2ab;
  width: 140px;
}


td:nth-child(2),
td:nth-child(3),
td:nth-child(4) {
  width: 200px;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: #884a39;
  background: #e9d7ab;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.42);
}

button:hover {
  background: #f5ebd3;
  color: #121212;
  border: #f5ebd3 2px solid;
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

h2 {
  margin-top: 0;
}

h2, p, span {
  color: #e9d7ab;
}

#parent-container {
  background-color: #15191d;
}
</style>


