<template>
  <div>
    <h3>Weekly Averages</h3>
    <div :hidden="showNoChart">
      <canvas id="myChart"></canvas>
    </div>
    <div :hidden="showNoData">
      <h1>No avaiable data</h1>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { ref, watch } from 'vue'

import Average from '../services/Average'

function createWeeklyChartData(dataArray, currentWeekNum, selectedMarkerID) {
  let weeklyChartData = {}
  for (let i = 0; i < dataArray.length; i++) {
    const stationID = dataArray[i].id
    if (stationID == selectedMarkerID) {
      const stationName = dataArray[i].name
      const dailyData = dataArray[i].dailyData
      if (dailyData !== 'No data') {
        const sortDaily = dailyData.split('\n')
        for (let j = 0; j < sortDaily.length - 1; j++) {
          const dataset = sortDaily[j].split(',')
          const weekNum = parseInt(dataset[1])
          const weekDay = parseInt(dataset[2])
          const cyc1 = parseFloat(dataset[3])
          const cyc2 = parseFloat(dataset[4])
          console.log(cyc1, cyc2);
          if (currentWeekNum == weekNum) {
            let data1 = [0, 0, 0, 0, 0, 0, 0]
            let data2 = [0, 0, 0, 0, 0, 0, 0]
            data1[weekDay] = cyc1
            data2[weekDay] = cyc2
            const label1 = `From ${stationName}`
            const label2 = `To ${stationName}`
            weeklyChartData = {
              labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
              datasets: [
                {
                  label: label1,
                  data: data1,
                  borderColor: '#F0810F',
                  pointBackgroundColor: '#F0810F',
                  fill: {
                    target: 'origin',
                    below: 'rgb(240,129,15)' // And blue below the origin
                  },
                  borderWidth: 1,
                  pointBorderColor: 'rgb(240,129,15)',
                  backgroundColor: 'rgba(240,129,15,0.4)',
                  tension: 0.2
                },
                {
                  label: label2,
                  data: data2,
                  borderColor: '#E6DF44',
                  pointBackgroundColor: '#E6DF44',
                  fill: {
                    target: 'origin',
                    below: 'rgb(230,223,68)' // And blue below the origin
                  },
                  borderWidth: 1,
                  pointBorderColor: 'rgb(230,223,68)',
                  backgroundColor: 'rgba(230,223,68,0.8)',
                  tension: 0.2
                }
              ]
            }
          }
        }
      }
    }
  }
  return weeklyChartData
}

export default {
  name: 'dataChart',
  props: {
    dailyDataArray: Array,
    monthlyDataArray: Array,
    selectedMarkerID: Number,
    showChart: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const currentDate = new Date()
    const currentWeekNum = Average.getWeekNumber(currentDate)

    const chartInstance = ref(null)
    const showNoChart = ref(false)
    const showNoData = ref(true)
    // Watch for changes in selectedMarkerID and update the chart accordingly
    watch(
      () => props.selectedMarkerID,
      () => {
        const data = createWeeklyChartData(
          props.dailyDataArray,
          currentWeekNum,
          props.selectedMarkerID
        )
        if (data.datasets) {
          chartInstance.value = createChart(data)
        } else {
          showNoData.value = false
          showNoChart.value = true
        }
      }
    )
    function createChart(data) {
      const chartElement = document.getElementById('myChart')
      const chartConfig = {
        type: 'line',
        data: data,
        options: {}
      }
      return new Chart(chartElement, chartConfig)
    }
    return {
      showNoChart,
      showNoData
    }
    /* DATASETS
    // dataset for Daily averages
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
  }
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
}
</style>
