<template>
  <p>WebVelo's Administrator Page</p>
  <p>Number of Stations: {{ sum }}</p>
    <div id="center-div">
        <button @click="logout">Logout</button>
    </div>
</template>
  
<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import StationAPI from '../services/StationAPI.js';

export default {
  setup() {
    const store = useStore();
    const isAuthenticated = () => {return store.getters.isAuthenticated;};
    const accessToken = () => {return store.getters.userAccessToken;};
    const refreshToken = () => {return store.getters.usreRefreshToken;};
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
    logout() {
      // Call the Node.js backend to logout
      const refreshToken = localStorage.getItem('refreshToken');
      fetch('http://localhost:4000/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
      }).then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.$router.push('/');
      }).catch(error => console.error(error));
    }
  }
};


</script>

<style>
</style>



