import axios from 'axios'

export default{
    dataAPI(url='http://localhost:8080') {
        return axios.create({
            baseURL: url
        })
    },
    authAPI(url='http://localhost:4000'){
        return axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    },
    weatherAPI(pos, key ){
        return axios.create({
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {
                q: pos,
                days: '3'
            },
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        })
    },
}

