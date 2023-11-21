<template>
  <div id="login-container">
    <div id="login-box">
      <div id="error" v-if="messageError">
        <p id="messageError">{{ messageError }}</p>
      </div>
      <div id="form-div">
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="Username" />
          <input type="password" v-model="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
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
#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #15191d;
}

#login-box {
  background-color: #313b4b;
  width: 40vw;
  max-height: 350px;
  border-radius: 15px;
  box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.52);
  padding: 20px;
  box-sizing: border-box;
}

#error {
  margin-bottom: 15px;
}

#error p {
  color: #ff5555;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 5px;
}

button {
  padding: 10px;

  background-color: #e9d7ab;
  color: #884a39; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #15191d;
  color: #fff;
}
</style>
