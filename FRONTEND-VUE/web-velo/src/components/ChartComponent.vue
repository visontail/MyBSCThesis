<template>
  <h1>ChartComponent</h1>
  <h1>{{ actualMarkerID }}</h1>
  <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

import Average from '../services/Average'

function createWeeklyChartData(dailyDataArray, currentWeekNum, actualMarkerID) {
  let weeklyChartData = {}
  for (let i = 0; i < dailyDataArray.length; i++) {
    const stationID = dailyDataArray[i].id
    if (stationID == actualMarkerID) {
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
            let data1 = [0, 0, 0, 0, 0, 0, 0]
            let data2 = [0, 0, 0, 0, 0, 0, 0]
            data1[weekDay] = cyc1
            data2[weekDay] = cyc2
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
                  backgroundColor: 'rgb(6, 85, 156)',
                  borderColor: 'rgb(99, 171, 235)',
                  data: data1
                },
                {
                  label: label2,
                  backgroundColor: 'rgb(191, 177, 6)',
                  borderColor: 'rgb(232, 223, 118)',
                  data: data2
                }
              ]
            }
          }
        }
      }
    }
  }
  console.log(weeklyChartData)
  return weeklyChartData
}

export default {
  name: 'dataChart',
  props: {
    dailyDataArray: Array,
    weeklyDataArray: Array,
    monthlyDataArray: Array,
    actualMarkerID: Number
  },
  setup(props) {
    const currentDate = new Date()
    const currentWeekNum = Average.getWeekNumber(currentDate)
    const weeklyData = createWeeklyChartData(props.dailyDataArray, currentWeekNum, props.actualMarkerID)

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

    const config = {
      type: 'line',
      data: weeklyData,
      options: {}
    }
    onMounted(async () => {
      const myChart = new Chart(document.getElementById('myChart'), config)
      return myChart
    })
  }
}
</script>

<style>
#myChart {
  /* Center horizontally*/
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
