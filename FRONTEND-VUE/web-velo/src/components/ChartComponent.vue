<template>
  <h1>ChartComponent</h1>
  <p>{{ dailyDataArray[64] }}</p>
  <p>{{ weeklyDataArray[64] }}</p>
  <p>{{ monthlyDataArray[64] }}</p>
  <canvas id="myChart"></canvas>
</template>

<script>



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
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My first dataset',
          backgroundColor: 'rgb(6, 85, 156)',
          borderColor: 'rgb(99, 171, 235)',
          data: [12, 19, 5, 15, 10, 16, 5]
        },
        {
          label: 'My second dataset',
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
