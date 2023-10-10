import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
  params: {
    q: '46.071301,18.233141',
    days: '3'
  },
  headers: {
    'X-RapidAPI-Key': 'RAPID_API_WEATHER_KEY',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};


try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
/* 
// 3 DAY FORECAST WEATHER
try {
  const response = await axios.request(options);
  const forecastData = response.data.forecast.forecastday;

  // Iterate through forecastday array and print each forecast
  forecastData.forEach((forecast, index) => {
    console.log(`Day ${index + 1} Forecast:`);
    console.log(`Date: ${forecast.date}`);
    console.log(`Condition: ${forecast.day.condition.text}`);
    console.log(`Max Temperature: ${forecast.day.maxtemp_c}°C`);
    console.log(`Min Temperature: ${forecast.day.mintemp_c}°C`);
    console.log('\n');
  });
} catch (error) {
  console.error(error);
} 
 */