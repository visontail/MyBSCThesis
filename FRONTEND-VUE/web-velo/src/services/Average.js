export default {
  // Function for creating dailyData for Weekly Chart
  groupByDaily(data) {
    // parse date strings to Date objects
    const groupByDay = {}
    let weekNum = ''
    // iterates through each dataset
    data.forEach((dataPoint) => {
      // string to date variable
      const dayKey = (dataPoint.Date).split('T')[0]
      // get week number of the year to categorize data
      weekNum = dataPoint.weekNumber
      // Group the data by day, week, and month
      if (!groupByDay[dayKey])
      groupByDay[dayKey] = []
      groupByDay[dayKey].push(dataPoint)
    })
    const dailyAverages = this.avgFormat(groupByDay,weekNum)
    return dailyAverages
  },
  groupByMonthly(data) {
    // Parse date strings to Date objects
    const groupByMonth = {};
    data.forEach((dataPoint) => {
      const date = new Date(dataPoint.Date);
      const yearKey = date.getFullYear();
      const monthKey = date.getMonth() + 1; // months starts with 0
      const monthYearKey = `${yearKey}-${monthKey}`;
  
      if (!groupByMonth[monthYearKey]) {
        groupByMonth[monthYearKey] = [];
      }
      groupByMonth[monthYearKey].push(dataPoint);
    });
  
    const monthlyAverages = this.avgFormat(groupByMonth)
    /* let monthlyAverages = '';
  
    if (!this.isEmpty(monthData)) {
      for (const key in monthData) {
        const [yearKey, monthKey] = key.split('-');
        const monthYear = `${yearKey}-${monthKey}`;
        monthlyAverages += `${monthYear}, ${yearKey}, ${monthKey}: ${this.formatValue(monthData[key])[0]}, ${this.formatValue(monthData[key])[1]}\n`;
      }
    } else {
      monthlyAverages = 'No data';
    } */
    console.log(monthlyAverages);
    return monthlyAverages;
  },
  

  avgFormat(groupByTime) {
    const timeData = this.calculateAverage(groupByTime)
    let timeAverages = ''
    if (!this.isEmpty(timeData)) {
      for (const key in timeData) {
        const yearKey = key.split('-')[0]
        const monthKey = key.split('-')[1]
        timeAverages += `${key}, ${yearKey}, ${monthKey} : ${this.formatValue(timeData[key])[0]} , ${this.formatValue(timeData[key])[1]}
        `
      }
    }
    else {
      timeAverages = 'No data'
    }
    return timeAverages
    /* const dailyData = this.calculateAverage(groupByDay)
    if (!this.isEmpty(dailyData)) {
      for (const key in dailyData) {
        console.log(key);
        const weekDay = this.dayOfWeekToDateString(key)
        dailyAverages += `${key}, ${weekKey}, ${weekDay}, ${this.formatValue(dailyData[key])[0]} , ${this.formatValue(dailyData[key])[1]}
        `}
    } 
    else {
      dailyAverages = 'No data'
    }
    return dailyAverages */
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
  getWeekNumber(date) {
    date.setHours(0, 0, 0, 0) // Set the time to the start of the day
    date.setDate(date.getDate() + 4 - (date.getDay() || 7)) // Adjust the date to Thursday (ISO 8601 week starts on Monday)
    const yearStart = new Date(date.getFullYear(), 0, 1) // Get the date for the start of the current year
    return `${date.getFullYear()}${Math.ceil(((date - yearStart) / 86400000 + 1) / 7)}`
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
    const daysOfWeek = ['0', '1', '2', '3', '4', '5', '6'] // 0-Sunday, 1-Monday, ..., 6-Saturday
    const dateParts = inputDate.split('-')
    const year = parseInt(dateParts[0])
    const month = parseInt(dateParts[1]) - 1 // Months are 0-indexed (0-January, 1-February, ..., 11-December)
    const day = parseInt(dateParts[2])
    const dateObject = new Date(year, month, day)
    const dayOfWeek = dateObject.getDay() // Get the day of the week as a number (0-6)
    const weekdayDate = `${daysOfWeek[dayOfWeek]}`
    return weekdayDate
  }
}
