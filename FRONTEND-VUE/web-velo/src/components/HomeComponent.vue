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
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.username, password: this.password }),
      }).catch(error => {
  console.error('Fetch error:', error);
});
if (response.status === 200){
    // If the response status is OK (e.g., 200), it's a successful response.
    const data = await response.json();
    console.log(data);
    // Handle the data, e.g., token handling.
  } else {
    // If the response status is not OK, it's an error response.
    // Check the response's content type.
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // If the error response is in JSON format.
      const errorData = await response.json();
      console.error('Error:', errorData);
      // Handle the error data, e.g., display an error message.
    } else {
      // If the error response is plain text.
      const errorText = await response.text();
      console.error('Error:', errorText);
      // Handle the error text, e.g., display an error message.
    }
  }
    },
  },
  }
  </script>




