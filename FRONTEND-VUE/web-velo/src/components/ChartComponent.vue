<template>
  <div>
    <h3>{{ chartTypeLabel }} Averages</h3>
    <div :hidden="showNoChart">
      <canvas id="myChart"></canvas>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary" @click="switchToDaily"> DAILY </button>
        <button type="button" class="btn btn-secondary" @click="switchToWeekly"> WEEKLY </button>
        <button type="button" class="btn btn-secondary" @click="switchToYearly"> YEARLY </button>
      </div>
    </div>  
    <div :hidden="showNoData">
      <h1>No available data</h1>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { ref, watch, computed } from 'vue'
import Average from '../services/Average'

// Function for 
function createDailyChartData(dataArray, selectedMarkerID) {
  let dailyChartData = {}
  const currentFullDate = new Date()
  const currentDate = Average.shortenDate(currentFullDate)
  for (let i = 0; i < dataArray.length; i++) {
    const stationID = dataArray[i].id
    if (stationID == selectedMarkerID) {
      const stationName = dataArray[i].name
      const hourlyData = dataArray[i].hourlyData
      if (hourlyData !== 'No data') {
        const sortHourly = hourlyData.split('\n')
        let data1 = [0, 0, 0, 0, 0, 0, 0]
        let data2 = [0, 0, 0, 0, 0, 0, 0]
        for (let j = 0; j < sortHourly.length - 1; j++) {
          const dataset = sortHourly[j].split(',')
          const dateKey = Average.shortenDate(new Date(dataset[0]))
          const hourKey = parseInt(dataset[2])
          const cyc1 = parseFloat(dataset[3])
          const cyc2 = parseFloat(dataset[4])
          if (currentDate == dateKey) {
            data1[hourKey] += cyc1
            data2[hourKey] += cyc2
            const label1 = `From ${stationName}`
            const label2 = `To ${stationName}`
            dailyChartData = {
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
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
  return dailyChartData
}
// Function for 
function createWeeklyChartData(dataArray, selectedMarkerID) {
  let weeklyChartData = {}
  const currentWeekNum = Average.getWeekNumber(new Date())
  for (let i = 0; i < dataArray.length; i++) {
    const stationID = dataArray[i].id
    if (stationID == selectedMarkerID) {
      const stationName = dataArray[i].name
      const dailyData = dataArray[i].dailyData
      if (dailyData !== 'No data') {
        const sortDaily = dailyData.split('\n')
        let data1 = [0, 0, 0, 0, 0, 0, 0]
        let data2 = [0, 0, 0, 0, 0, 0, 0]
        for (let j = 0; j < sortDaily.length - 1; j++) {
          const dataset = sortDaily[j].split(',')
          const weekNum = parseInt(dataset[1])
          const weekDay = parseInt(dataset[2])
          const cyc1 = parseFloat(dataset[3])
          const cyc2 = parseFloat(dataset[4])
          if (currentWeekNum == weekNum) {
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
// Function for 
function createYearlyChartData(dataArray, selectedMarkerID) {
  let yearlyChartData = {}
  const currentYearNum = new Date().getFullYear()
  for (let i = 0; i < dataArray.length; i++) {
    const stationID = dataArray[i].id
    if (stationID == selectedMarkerID) {
      const stationName = dataArray[i].name
      const monthlyData = dataArray[i].MonthlyData
      if (monthlyData !== 'No data') {
        const sortMonthly = monthlyData.split('\n')
        let data1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let data2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let j = 0; j < sortMonthly.length - 1; j++) {
          const dataset = sortMonthly[j].split(',')
          const yearNum = parseInt(dataset[1])
          const monthTag = parseInt(dataset[2])
          const cyc1 = parseFloat(dataset[3])
          const cyc2 = parseFloat(dataset[4])
          if (currentYearNum == yearNum) {
            data1[monthTag - 1] = cyc1
            data2[monthTag - 1] = cyc2
            const label1 = `From ${stationName}`
            const label2 = `To ${stationName}`
            yearlyChartData = {
              labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
  return yearlyChartData
}

export default {
  name: 'dataChart',
  props: {
    hourlyDataArray: Array,
    dailyDataArray: Array,
    monthlyDataArray: Array,
    selectedMarkerID: Number,
    showChart: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const chartInstance = ref(null)
    const showNoChart = ref(false)
    const showNoData = ref(true)
    const currentChartType = ref('weekly')
    // Watch for changes in selectedMarkerID and update the chart accordingly
    watch(
      [() => props.selectedMarkerID, () => currentChartType.value],
      () => {
        let chartData = null
        if (chartInstance.value) {
          // Destroy the existing chart instance
          chartInstance.value.destroy()
        }
        if (currentChartType.value === 'daily') {
          chartData = createDailyChartData(
            props.hourlyDataArray,
            props.selectedMarkerID
          )
        } else if (currentChartType.value === 'weekly') {
          chartData = createWeeklyChartData(
            props.dailyDataArray,
            props.selectedMarkerID
          )
        } else if (currentChartType.value === 'yearly') {
          chartData = createYearlyChartData(
            props.monthlyDataArray,
            props.selectedMarkerID
          )
        }
        if (chartData && chartData.datasets) {
          chartInstance.value = createChart(chartData)
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
    function switchToDaily() {
      currentChartType.value = 'daily'
    }

    function switchToWeekly() {
      currentChartType.value = 'weekly'
    }

    function switchToYearly() {
      currentChartType.value = 'yearly'
    }

    const chartTypeLabel = computed(() => {
      if (currentChartType.value === 'daily') {
        return 'Daily'
      } else if (currentChartType.value === 'weekly') {
        return 'Weekly'
      } else if (currentChartType.value === 'yearly') {
        return 'Yearly'
      } else {
        return ''
      }
    })
    return {
      showNoChart,
      showNoData,
      switchToDaily,
      switchToWeekly,
      switchToYearly,
      chartTypeLabel,
    }
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
