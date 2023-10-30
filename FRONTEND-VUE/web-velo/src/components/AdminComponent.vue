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
import API from '../services/API'

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
    async logout() {
      const refreshToken = this.$store.getters.usreRefreshToken
      try {
        const response = await API.authAPI().delete('/logout', {
          headers: {
            Refresh: refreshToken
          }
        });
        if (response.status === 204){
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
    }
  }
};


</script>

<style scoped>

#center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}

</style>



