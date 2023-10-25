<template>
    <div id="error">
        <p id="messageError">{{ messageError }}</p>    
    </div>
    <div>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="username" />
        <input type="password" v-model="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'MapApp',
    data() {
      return {
        username: '',
        password: '',
        messageError: '', // Initialize messageError
      };
    },
    methods: {
      async login() {
        this.messageError = ''; // Reset the error message
  
        // Küldj egy POST kérést a szervernek a bejelentkezéshez
        try {
          const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.username, password: this.password }),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);

            this.$store.commit('login', data.accessToken);

          } else {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              // If the error response is in JSON format.
              const errorData = await response.json();
              this.messageError = 'Error: ' + JSON.stringify(errorData.error);
            } else {
              // If the error response is plain text.
              const errorText = await response.text();
              console.error('Error:', errorText);
              // Handle the error text, e.g., display an error message.
            }
          }
        } catch (error) {
          console.error('Fetch error:', error);
          this.messageError = 'Fetch error: ' + error.message;
        }
      },
    },
  };
  </script>
  