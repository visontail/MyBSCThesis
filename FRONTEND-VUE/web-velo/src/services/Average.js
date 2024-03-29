export default {
  // Function for 
  groupByHourly(data) {
    // parse date strings to Date objects
    const groupByHourly = {}
    let hourlyAverages = ''
    // iterates through each dataset
    data.forEach((dataPoint) => {
      // string to date variable
      const hourlyKey = dataPoint.Date.split('T')[0] + ' ' + dataPoint.startTime
      // get week number of the year to categorize data
      // Group the data by day, week, and month
      if (!groupByHourly[hourlyKey]) groupByHourly[hourlyKey] = []
      groupByHourly[hourlyKey].push(dataPoint)
    })
    const hourlyData = this.calculateAverage(groupByHourly)
    if (!this.isEmpty(hourlyData)) {
      for (const key in hourlyData) {
        const dayKey = (new Date(key.split(' ')[0])).getDay()
        const hourKey = this.createHourKey(key)
        hourlyAverages += `${key}, ${dayKey}, ${hourKey}, ${this.formatValue(hourlyData[key])[0]} , ${this.formatValue(hourlyData[key])[1]}
          `
      }
    } else {
      hourlyAverages = 'No data'
    }
    return hourlyAverages
  },
  // Function for creating dailyData for Weekly Chart
  groupByDaily(data) {
    // parse date strings to Date objects
    const groupByDay = {}
    let dailyAverages = ''
    // iterates through each dataset
    data.forEach((dataPoint) => {
      // string to date variable
      const dayKey = dataPoint.Date.split('T')[0]
      // get week number of the year to categorize data
      // Group the data by day, week, and month
      if (!groupByDay[dayKey]) groupByDay[dayKey] = []
      groupByDay[dayKey].push(dataPoint)
    })
    const dailyData = this.calculateAverage(groupByDay)
    if (!this.isEmpty(dailyData)) {
      for (const key in dailyData) {
        const weekDay = this.dayOfWeekToDateString(key)
        const weekNum = this.getWeekNumber(new Date(key))
        dailyAverages += `${key}, ${weekNum}, ${weekDay}, ${this.formatValue(dailyData[key])[0]} , ${this.formatValue(dailyData[key])[1]}
        `
      }
    } else {
      dailyAverages = 'No data'
    }
    return dailyAverages
  },
  // Function for 
  groupByMonthly(data) {
    // Parse date strings to Date objects
    const groupByMonth = {}
    let monthlyAverages = ''
    data.forEach((dataPoint) => {
      const date = new Date(dataPoint.Date)
      const yearKey = date.getFullYear()
      const monthKey = date.getMonth() + 1 // months starts with 0
      const monthYearKey = `${yearKey}-${monthKey}`

      if (!groupByMonth[monthYearKey]) {
        groupByMonth[monthYearKey] = []
      }
      groupByMonth[monthYearKey].push(dataPoint)
    })
    const monthlyData = this.calculateAverage(groupByMonth)
    if (!this.isEmpty(monthlyData)) {
      for (const key in monthlyData) {
        const yearKey = key.split('-')[0]
        const monthKey = key.split('-')[1]
        monthlyAverages += `${key}, ${yearKey}, ${monthKey}, ${this.formatValue(monthlyData[key])[0]} , ${this.formatValue(monthlyData[key])[1]}
        `
      }
    } else {
      monthlyAverages = 'No data'
    }
    return monthlyAverages
  },
  // Function for 
  isEmpty(obj) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  },
  // Function for 
  formatValue(dataObject) {
    let dataList = []
    let data = JSON.parse(JSON.stringify(dataObject))
    dataList.push(data.CycTraff1.toFixed(2))
    dataList.push(data.CycTraff2.toFixed(2))
    return dataList
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
  // Function for 
  createHourKey(time){
      const hour = time.split(' ')[1].split(':')[0]
      let hourKey = 0
      if (hour >= 0 && hour < 4) {
        hourKey = 0;
        return hourKey
      } else if (hour >= 4 && hour < 8) {
        hourKey = 1;
        return hourKey
      } else if (hour >= 8 && hour < 12) {
        hourKey = 2;
        return hourKey
      } else if (hour >= 12 && hour < 16) {
        hourKey = 3;
        return hourKey
      } else if (hour >= 16 && hour < 20) {
        hourKey = 4;
        return hourKey
      } else if (hour >= 20 && hour < 24) {
        hourKey = 5;
        return hourKey
      }
        else if (hour == 24) {
        hourKey = 5;
        return hourKey
      } else {
        return 'Invalid input';
      }
  },
  // Helper function to get the ISO week number
  getWeekNumber(date) {
    date.setHours(0, 0, 0, 0) // Set the time to the start of the day
    date.setDate(date.getDate() + 4 - (date.getDay() || 7)) // Adjust the date to Thursday (ISO 8601 week starts on Monday)
    const yearStart = new Date(date.getFullYear(), 0, 1) // Get the date for the start of the current year
    return `${date.getFullYear()}${Math.ceil(((date - yearStart) / 86400000 + 1) / 7)}`
  },
  // Function for 
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
  },
  // Function for
  shortenDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const shortenDate = `${year}-${month}-${day} `;
  return shortenDate;
  },
}
