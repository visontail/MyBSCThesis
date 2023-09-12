
export default {
    groupByTimePeriod(data){
        // Step 1: Parse date strings to Date objects
        data.forEach((dataPoint) => {
            dataPoint.startTime = new Date(dataPoint.startTime);
            dataPoint.endTime = new Date(dataPoint.endTime);
        });

        // Step 2: Group the data by day, week, and month
        const groupByDay = {};
        const groupByWeek = {};
        const groupByMonth = {};
        // Helper function to get the ISO week number
        function getYearWeek(date) {
            const year = date.getFullYear();
            const d = new Date(Date.UTC(year, date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(year, 0, 1));
            return year + String(Math.ceil(((d - yearStart) / 86400000 + 1) / 7)).padStart(2, '0');
        }

        data.forEach((dataPoint) => {
            const dayKey = dataPoint.startTime.toISOString().split('T')[0];
            const weekKey = getYearWeek(dataPoint.startTime);
            const monthKey = dataPoint.startTime.toISOString().slice(0, 7);
          
            if (!groupByDay[dayKey]) groupByDay[dayKey] = [];
            if (!groupByWeek[weekKey]) groupByWeek[weekKey] = [];
            if (!groupByMonth[monthKey]) groupByMonth[monthKey] = [];
          
            groupByDay[dayKey].push(dataPoint);
            groupByWeek[weekKey].push(dataPoint);
            groupByMonth[monthKey].push(dataPoint);
          });
          const dailyAverages = this.calculateAverage(groupByDay)
          return dailyAverages
        // create 3 different function for daily, weekly, monthly
    },
    // Step 3: Calculate the averages for each group
    calculateAverage(data) {
        const result = {};
        for (const key in data) {
            // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty(key)) {
                const group = data[key];
                const avg = {};
                if (group.length > 0) {
                // Calculate average for each traffic type
                    const trafficTypes = Object.keys(group[0]).filter((key) => key.includes('Traff'));
                    trafficTypes.forEach((type) => {
                        const sum = group.reduce((acc, item) => acc + item[type], 0);
                        avg[type] = sum / group.length;
                    });
                    // Store the average in the result object
                    result[key] = avg;
                }
            }
        }
    return result;
    },
    isEmpty(obj) {
        for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      },
       formatValue(dataObject) {
        let dataList = []
        let data = JSON.parse(JSON.stringify(dataObject))
        dataList.push(data.CycTraff1);
        dataList.push(data.CycTraff2);
        dataList.push(data.PedTraff1);
        dataList.push(data.PedTraff2);
        dataList.push(data.OtherTraff1);
        dataList.push(data.OtherTraff2);

          console.log(dataList);
        return dataList;
      }
}





/*   // Function to calculate daily averages
export default{
    calculateDailyAverages(data) {
          // Step 1: Parse date strings to Date objects
  data.forEach((item) => {
    item.startTime = new Date(item.startTime);
    item.endTime = new Date(item.endTime);
  });
  
  // Step 2: Group the data by day, week, and month
  const groupByDay = {};
  const groupByWeek = {};
  const groupByMonth = {};
  
  data.forEach((item) => {
    const dayKey = item.startTime.toISOString().split('T')[0];
    const weekKey = getYearWeek(item.startTime);
    const monthKey = item.startTime.toISOString().slice(0, 7);
  
    if (!groupByDay[dayKey]) groupByDay[dayKey] = [];
    if (!groupByWeek[weekKey]) groupByWeek[weekKey] = [];
    if (!groupByMonth[monthKey]) groupByMonth[monthKey] = [];
  
    groupByDay[dayKey].push(item);
    groupByWeek[weekKey].push(item);
    groupByMonth[monthKey].push(item);
  });
  
  // Helper function to get the ISO week number
  function getYearWeek(date) {
    const year = date.getFullYear();
    const d = new Date(Date.UTC(year, date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(year, 0, 1));
    return year + String(Math.ceil(((d - yearStart) / 86400000 + 1) / 7)).padStart(2, '0');
  }
  
  // Step 3: Calculate the averages for each group
  function calculateAverage(data) {
    const result = {};
  
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        const group = data[key];
        const avg = {};
  
        if (group.length > 0) {
          // Calculate average for each traffic type
          const trafficTypes = Object.keys(group[0]).filter((key) => key.includes('Traff'));
          trafficTypes.forEach((type) => {
            const sum = group.reduce((acc, item) => acc + item[type], 0);
            avg[type] = sum / group.length;
          });
  
          // Store the average in the result object
          result[key] = avg;
        }
      }
    }
  
    return result;
  }
  
  const dailyAverages = calculateAverage(groupByDay);
  const weeklyAverages = calculateAverage(groupByWeek);
  const monthlyAverages = calculateAverage(groupByMonth);
  
  console.log('Daily Averages:', dailyAverages);
  console.log('Weekly Averages:', weeklyAverages);
  console.log('Monthly Averages:', monthlyAverages);
      }
} */


 /* 

        // Iterate through each data point
        data.forEach(dataPoint => {
        const startTime = new Date(dataPoint.startTime);
        const dayKey = startTime.toISOString().split('T')[0]; // Group by day
        console.log('Daily:' + dayKey);
        const weekKey = getYearWeek(startTime); // Group by day
        function getYearWeek(date) {
            const year = date.getFullYear();
            const d = new Date(Date.UTC(year, date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(year, 0, 1));
            return year + String(Math.ceil(((d - yearStart) / 86400000 + 1) / 7)).padStart(2, '0');
        }
        console.log('Weekly:' + weekKey);
        const monthKey = startTime.toISOString().slice(0, 7);
        console.log('Monthly:' + monthKey);

        if (!dailyAverages[dayKey]) {
            dailyAverages[dayKey] = {
            CycTraff1: 0,
            OtherTraff1: 0,
            PedTraff1: 0,
            CycTraff2: 0,
            OtherTraff2: 0,
            PedTraff2: 0,
            count: 0, // To keep track of the number of data points in the day
            };
        }

        // Sum the traffic data for the day
        dailyAverages[dayKey].CycTraff1 += dataPoint.CycTraff1;
        dailyAverages[dayKey].OtherTraff1 += dataPoint.OtherTraff1;
        dailyAverages[dayKey].PedTraff1 += dataPoint.PedTraff1;
        dailyAverages[dayKey].CycTraff2 += dataPoint.CycTraff2;
        dailyAverages[dayKey].OtherTraff2 += dataPoint.OtherTraff2;
        dailyAverages[dayKey].PedTraff2 += dataPoint.PedTraff2;
        // Add more traffic types here if needed

        dailyAverages[dayKey].count++;
        });

        // Calculate daily averages
        for (const dayKey in dailyAverages) {
        const dayAverage = dailyAverages[dayKey];
        dayAverage.CycTraff1 /= dayAverage.count;
        dayAverage.OtherTraff1 /= dayAverage.count;
        dayAverage.PedTraff1 /= dayAverage.count;
        dayAverage.CycTraff2 /= dayAverage.count;
        dayAverage.OtherTraff2 /= dayAverage.count;
        dayAverage.PedTraff2 /= dayAverage.count;
        // Calculate other traffic types if needed
        }
            console.log(dailyAverages);
    } */