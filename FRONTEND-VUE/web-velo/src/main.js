import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import store from '../src/store/store.js'

const app = createApp(App)

app.use(router)
app.use(store);
app.mount('#app')

