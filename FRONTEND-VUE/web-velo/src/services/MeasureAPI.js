import API from "./API";

export default {
    getStats(id) {
        return API().get(`/stats/${id}`)
    }
}