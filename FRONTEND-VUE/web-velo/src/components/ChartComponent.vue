<template>
  <p> Weekly Averages </p>
  <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';
import { ref, watch } from 'vue';

import Average from '../services/Average';

function createWeeklyChartData(dailyDataArray, currentWeekNum, selectedMarkerID) {
  let weeklyChartData = {}
  for (let i = 0; i < dailyDataArray.length; i++) {
    const stationID = dailyDataArray[i].id
    if (stationID == selectedMarkerID) {
      const stationName = dailyDataArray[i].name
      const dailyData = dailyDataArray[i].dailyData
      if (dailyData !== 'No data') {
        const sortDaily = dailyData.split('\n')
        for (let j = 0; j < sortDaily.length - 1; j++) {
          const dataset = sortDaily[j].split(',')
          const date = new Date(dataset[0])
          const weekDay = parseInt(dataset[2])
          const cyc1 = parseFloat(dataset[3])
          const cyc2 = parseFloat(dataset[4])
          const weekNum = Average.getWeekNumber(date)
          if (currentWeekNum == weekNum) {
            let data1 = [0, 90, 50, 60, 23, 25, 12]
            let data2 = [0, 10, 50, 34, 40, 60, 21]
            data1[weekDay-1] = cyc1
            data2[weekDay-1] = cyc2
            const label1 = `From ${stationName}`
            const label2 = `To ${stationName}`
            
            weeklyChartData = {
              labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ],
              datasets: [
                {
                  label: label1,
                  data: data1,
                  borderColor: '#F0810F',
                  pointBackgroundColor: '#F0810F',
                  fill: {
                    target: 'origin',
                    below: 'rgb(240,129,15)'    // And blue below the origin
                  },
                  borderWidth: 1,
                  pointBorderColor: 'rgb(240,129,15)',
                  backgroundColor: 'rgba(240,129,15,0.4)',
                  tension: 0.2,
                },
                {
                  label: label2,
                  data: data2,
                  borderColor: '#E6DF44',
                  pointBackgroundColor: '#E6DF44',
                  fill: {
                    target: 'origin',
                    below: 'rgb(230,223,68)'    // And blue below the origin
                  },
                  borderWidth: 1,
                  pointBorderColor: 'rgb(230,223,68)',
                  backgroundColor: 'rgba(230,223,68,0.8)',
                  tension: 0.2,
                }
              ]
            }
          }
        }
      }
    }
  }
  console.log(weeklyChartData);
  return weeklyChartData
}
export default {
  name: 'dataChart',
  props: {
    dailyDataArray: Array,
    weeklyDataArray: Array,
    monthlyDataArray: Array,
    selectedMarkerID: Number
  },
  setup(props) {

    const currentDate = new Date()
    const currentWeekNum = Average.getWeekNumber(currentDate)

    const chartInstance = ref(null);
    // Watch for changes in selectedMarkerID and update the chart accordingly
    watch(
      () => props.selectedMarkerID,
      () => {
        if (!chartInstance.value) {
          const data = createWeeklyChartData(props.dailyDataArray, currentWeekNum, props.selectedMarkerID)
          chartInstance.value = createChart(data);
        } else {
          const updatedChartData = createWeeklyChartData(props.dailyDataArray, currentWeekNum, props.selectedMarkerID);
          chartInstance.value.data = updatedChartData;
          chartInstance.value.update();
        }
      }
    );

function createChart(data) {
  const chartElement = document.getElementById('myChart');
  const chartConfig = {
    type: 'line',
    data: data,
    options: {},
  };
  return new Chart(chartElement, chartConfig);
}

    /* DATASETS
    // dataset for Weekly averages
    const dailyData = {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      datasets: [
        {
          label: 'From [StationName]',
          backgroundColor: 'rgb(6, 85, 156)',
          borderColor: 'rgb(99, 171, 235)',
          data: [0, 59, 5, 20, 40, 16, 0]
        },
        {
          label: 'To [StationName]',
          backgroundColor: 'rgb(191, 177, 6)',
          borderColor: 'rgb(232, 223, 118)',
          data: [14, 10, 14, 6, 18, 8, 18]
        }
      ]
    }
    // dataset for Monthly averages
    const weeklyData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'From [StationName]',
          backgroundColor: 'rgb(6, 85, 156)',
          borderColor: 'rgb(99, 171, 235)',
          data: [0, 59, 5, 20, 40, 16, 0]
        },
        {
          label: 'To [StationName]',
          backgroundColor: 'rgb(191, 177, 6)',
          borderColor: 'rgb(232, 223, 118)',
          data: [14, 10, 14, 6, 18, 8, 18]
        }
      ]
    }
    // dataset for Yearly averages
    const monthlyData = {
      labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'From [StationName]',
          backgroundColor: 'rgb(6, 85, 156)',
          borderColor: 'rgb(99, 171, 235)',
          data: [0, 59, 5, 20, 40, 16, 0, 5, 20, 40, 16, 0]
        },
        {
          label: 'To [StationName]',
          backgroundColor: 'rgb(191, 177, 6)',
          borderColor: 'rgb(232, 223, 118)',
          data: [14, 10, 14, 6, 18, 8, 18, 14, 6, 18, 8, 18]
        }
      ]
    }
*/
  },
}
</script>

<style>
#myChart {
  max-height: 300px;
  max-width: 600px;
  margin: 0;
}
#stat {
  font-size: 24px;
  margin: 12px;
  outline: dashed 1px black;
}
</style>