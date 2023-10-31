<template>
    <div id="error">
      <p id="messageError">{{ messageError }}</p>
    </div>
    <div id="center-div">
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="username" />
        <input type="password" v-model="password" placeholder="password" />
        <button type="submit">Login</button>
      </form>
    </div>
</template>

<script>
import API from '../services/API'

export default {
  name: 'MapApp',
  data() {
    return {
      username: '',
      password: '',
      messageError: ''
    }
  },
  methods: {
    async login() {
      this.messageError = '' // Reset the error message
      // Küldj egy POST kérést a szervernek a bejelentkezéshez
      try {
        const response = await API.authAPI().post('/login', {
          name: this.username,
          password: this.password
        })
        if (response.status === 200) {
          const data = await response.data
          this.$store.commit('login', { accessToken: data.accessToken, refreshToken: data.refreshToken });
          this.$router.push({ name: 'admin' })
        } else {
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
          this.username = '' // Clear the username field
          this.password = '' // Clear the password field
        }
      } catch (error) {
        console.error('Fetch error:', error)
        this.messageError = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

#center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>
