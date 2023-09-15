<template>
    <h1>ChartComponent</h1>
    <canvas id="myChart"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { onMounted } from 'vue'

const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']

const data = {
  labels: labels,
  datasets: [
    {
      label: 'My first dataset',
      backgroundColor: 'rgb(6, 85, 156)',
      borderColor: 'rgb(99, 171, 235)',
      data: [12, 19, 3, 5, 2, 16]
    },
    {
      label: 'My second dataset',
      backgroundColor: 'rgb(191, 177, 6)',
      borderColor: 'rgb(232, 223, 118)',
      data: [14, 10, 6, 10, 8, 1]
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
})
</script>

<style>

#myChart{
  /* Center horizontally*/
  max-height:  300px;
  max-width: 600px;
  margin: 0;
}
#stat {
    font-size: 24px;
    margin: 12px;
    outline: dashed 1px black;
}
</style>
