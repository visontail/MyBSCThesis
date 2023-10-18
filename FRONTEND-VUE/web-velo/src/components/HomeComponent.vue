<template>
  <p>Hello World!</p>
  <!-- 
    <MenubarComponent />
    <GoogleMapComponent />
  -->
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="username">
      <input type="password" v-model="password" placeholder="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
  <script>
  //import GoogleMapComponent from '@/components/GoogleMapComponent.vue';
  //import MenubarComponent from '@/components/MenubarComponent.vue';
  
  export default {
    name: 'MapApp',
    components: {
      //GoogleMapComponent,
      //MenubarComponent
    },
    data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      // Küldj egy POST kérést a szervernek a bejelentkezéshez
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.username, password: this.password }),
      });
      console.log(response.status);
    },
  },
  }
  </script>