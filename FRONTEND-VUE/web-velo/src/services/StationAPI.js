import API from "./API";

export default {
    getMarkerData() {
        return API().get('/pos')
    },
    getSumStations() {
        return API().get('/sum')
    }
}