<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" :href="homeRoute">WebVelo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Number of Stations: {{ sum }}</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About the Project</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import StationAPI from '../services/StationAPI.js';

export default{
  name: 'MenuBar',
  computed: {
    homeRoute() {
      return this.$router.resolve({ name: 'home' }).href;
    },
    loginRoute() {
      return this.$router.resolve({ name: 'login' }).href;
    },
    aboutRoute(){
      return this.$router.resolve({ name: 'about' }).href;
    }
  },
  setup() {
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
  }
}



</script>

<style>

</style>