import API from "./API.js";

export default {
    getStats(id) {
        return API.dataAPI().get(`/stats/${id}`)
    },
    getTodaySum(id) {
        return API.dataAPI().get(`/today/${id}`)
    },
    getYearSum(id) {
        return API.dataAPI().get(`/this-year/${id}`)
    },
}