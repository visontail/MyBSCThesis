export default {
  // function for creating dailyData for Weekly Chart
  groupByDaily(data) {
    // parse date strings to Date objects
    const groupByDay = {}
    let weekKey = ""
    let mesDate = ""
    data.forEach((dataPoint) => {
      dataPoint.startTime = new Date(dataPoint.startTime)
      weekKey = this.getYearWeek(dataPoint.startTime)
      // Group the data by day, week, and month
      const dayKey = dataPoint.startTime.toISOString().split('T')[0]
      if (!groupByDay[dayKey]) groupByDay[dayKey] = []
      groupByDay[dayKey].push(dataPoint)
    })

    const dailyData = this.calculateAverage(groupByDay)
    let dailyAverages = ''
    if (!this.isEmpty(dailyData)) {
      for (const key in dailyData) {
        const weekDay = this.dayOfWeekToDateString(key)
        dailyAverages += ` ${dataPoint.startTime}, ${weekKey}, ${weekDay}, ${this.formatValue(dailyData[key])[0]} , ${this.formatValue(dailyData[key])[1]} 
`
      }
    }
    else {
      dailyAverages = 'No data'
    }
    return dailyAverages
  },
  groupByWeekly(data) {
    // parse date strings to Date objects
    const groupByWeek = {}
    data.forEach((dataPoint) => {
      dataPoint.startTime = new Date(dataPoint.startTime)
      const weekKey = this.getYearWeek(dataPoint.startTime)
      if (!groupByWeek[weekKey]) groupByWeek[weekKey] = []
      groupByWeek[weekKey].push(dataPoint)
    })
    const weeklyAverages = this.calculateAverage(groupByWeek)
    let weeklyData = this.statContentCreator(weeklyAverages)

    return weeklyData
  },
  groupByMontly(data) {
    // parse date strings to Date objects
    const groupByMonth = {}
    data.forEach((dataPoint) => {
      dataPoint.startTime = new Date(dataPoint.startTime)
      const monthKey = dataPoint.startTime.toISOString().slice(0, 7)
      if (!groupByMonth[monthKey]) groupByMonth[monthKey] = []
      groupByMonth[monthKey].push(dataPoint)
    })
    const monthlyAverages = this.calculateAverage(groupByMonth)
    let monthlyData = this.statContentCreator(monthlyAverages)
    return monthlyData
  },

  statContentCreator(data) {
    let additionalContent = ''
    if (!this.isEmpty(data)) {
      for (const key in data) {
        additionalContent += `${key} : ${this.formatValue(data[key])[0]} , ${this.formatValue(data[key])[1]}
        `
      }
    }
    return additionalContent
  },
  isEmpty(obj) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  },
  formatValue(dataObject) {
    let dataList = []
    let data = JSON.parse(JSON.stringify(dataObject))
    dataList.push(data.CycTraff1.toFixed(2))
    dataList.push(data.CycTraff2.toFixed(2))
    return dataList
  },

  // Helper function to get the ISO week number
  getYearWeek(date) {
    const year = date.getFullYear()
    const d = new Date(Date.UTC(year, date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(year, 0, 1))
    return year + String(Math.ceil(((d - yearStart) / 86400000 + 1) / 7)).padStart(2, '0')
  },

  // Calculate the averages for each group
  calculateAverage(data) {
    const result = {}
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const group = data[key]
        const avg = {}
        if (group.length > 0) {
          // Calculate average for each traffic type
          const trafficTypes = Object.keys(group[0]).filter((key) => key.includes('CycTraff'))
          trafficTypes.forEach((type) => {
            const sum = group.reduce((acc, item) => acc + item[type], 0)
            avg[type] = sum / group.length
          })
          // Store the average in the result object
          result[key] = avg
        }
      }
    }
    return result
  },
  dayOfWeekToDateString(inputDate) {
    const daysOfWeek = ['0', '1', '2', '3', '4', '5', '6']; // 0-Sunday, 1-Monday, ..., 6-Saturday
  
    const dateParts = inputDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed (0-January, 1-February, ..., 11-December)
    const day = parseInt(dateParts[2]);
  
    const dateObject = new Date(year, month, day);
    const dayOfWeek = dateObject.getDay(); // Get the day of the week as a number (0-6)
    const weekdayDate = `${daysOfWeek[dayOfWeek]}`;
    return weekdayDate
  }

}
