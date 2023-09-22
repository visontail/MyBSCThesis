import API from "./API";

export default {
    getStats(id) {
        return API().get(`/stats/${id}`)
    },
    getTodaySum(id) {
        return API().get(`/today/${id}`)
    }
}