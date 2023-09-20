<template>
  <h1>ChartComponent</h1>
  <p>{{ dailyDataArray[64] }}</p>
  <p>{{ weeklyDataArray[64] }}</p>
  <p>{{ monthlyDataArray[64] }}</p>
  <canvas id="myChart"></canvas>
</template>

<script>

function createWeeklyChartData(dailyDataArray) {

}

import Chart from 'chart.js/auto'
import { onMounted } from 'vue'
export default {
  name: 'dataChart',
  props: {
    dailyDataArray: Array,
    weeklyDataArray: Array,
    monthlyDataArray: Array
  },
  setup() {



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
    
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'From [StationName]',
          backgroundColor: 'rgb(6, 85, 156)',
          borderColor: 'rgb(99, 171, 235)',
          data: [12, 19, 5, 15, 10, 16, 5]
        },
        {
          label: 'To [StationName]',
          backgroundColor: 'rgb(191, 177, 6)',
          borderColor: 'rgb(232, 223, 118)',
          data: [14, 10, 14, 6, 18, 8, 18]
        }
      ]
    }

    const config = {
      type: 'line',
      data: data,
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
