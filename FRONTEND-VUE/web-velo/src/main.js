import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Vue3GoogleMap from '/node_modules/.vite/deps/vue3-google-map.js?v=5bb65bdf';



const app = createApp(App)

app.use(Vue3GoogleMap, {
    load: {
        key: 'AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc',
    }
})



app.use(router)

app.mount('#app')

