import axios from 'axios';
export default {
  // Funtion for
  async getWeatherAPIdata(pos){
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
      params: {
        q: pos,
        days: '3'
      },
      headers: {
        'X-RapidAPI-Key': "29c96c7a85mshf0de203c63bd9e3p1942f6jsnd6241943c4e4",
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      return response.data
    } catch (error) {
      console.error(error);
    }
  },
  getTodayWeatherData(data){
    try {
      return data.current.temp_c
    } catch (error) {
      console.error(error);
    }
  },
  getIconData(data){
    try {
      return data.current.condition.icon
    } catch (error) {
      console.error(error);
    }
  },
  // Funtion for
  getForecastData(data){
    // 3 DAY FORECAST WEATHER
    try {
      const forecastData = data.forecast.forecastday;
      // Iterate through forecastday array and print each forecast
      forecastData.forEach((forecast, index) => {
        const temp = ( parseFloat(forecast.day.maxtemp_c) + parseFloat(forecast.day.mintemp_c) ) / 2
        console.log(forecast.day.maxtemp_c, forecast.day.mintemp_c);
        const data = `Day ${index + 1}, ${forecast.date}, ${temp}°C
        `
        return data
      });
    } catch (error) {
      console.error(error);
    } 
  }
}