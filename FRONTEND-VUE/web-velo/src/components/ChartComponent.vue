<template>
  <h1>ChartComponent</h1>
  <p> {{ dailyDataArray[64] }}</p>
  <canvas id="myChart"></canvas>
</template>

<script>


function createWeeklyChartData(dailyDataArray, currentWeekNum) {
  let weeklyChartData = {}
  for (let i = 0; i < dailyDataArray.length; i++) {
    //const stationID = dailyDataArray[i].id
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
        const weekNum = getWeekNumber(date)
        if (currentWeekNum == weekNum) {
          let data1 = [0, 0, 0, 0, 0, 0, 0]
          let data2 = [0, 0, 0, 0, 0, 0, 0]
          data1[weekDay] = cyc1
          data1[weekDay] = cyc2
          const label1 = `From ${stationName}`
          const label2 = `To ${stationName}`
          weeklyChartData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
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
  console.log(weeklyChartData);
  return weeklyChartData
}
// todo migrate to Average Js use it there also and import it to here
function getWeekNumber(date) {
  date.setHours(0, 0, 0, 0) // Set the time to the start of the day
  date.setDate(date.getDate() + 4 - (date.getDay() || 7)) // Adjust the date to Thursday (ISO 8601 week starts on Monday)
  const yearStart = new Date(date.getFullYear(), 0, 1) // Get the date for the start of the current year
  return `${date.getFullYear()}${Math.ceil(((date - yearStart) / 86400000 + 1) / 7)}`
}

import Chart from 'chart.js/auto'
import { onMounted } from 'vue'
export default {
  name: 'dataChart',
  props: {
    dailyDataArray: Array,
    weeklyDataArray: Array,
    monthlyDataArray: Array,
  },
  setup(props) {
    const currentDate = new Date()
    const currentWeekNum = getWeekNumber(currentDate)
    const weeklyData = createWeeklyChartData(props.dailyDataArray, currentWeekNum)

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
