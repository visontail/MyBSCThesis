import dataAPI from "./API.js";

export default {
    getStats(id) {
        return dataAPI().get(`/stats/${id}`)
    },
    getTodaySum(id) {
        return dataAPI().get(`/today/${id}`)
    },
    getYearSum(id) {
        return dataAPI().get(`/this-year/${id}`)
    },
}