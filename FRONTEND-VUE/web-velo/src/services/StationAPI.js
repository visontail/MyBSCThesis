import API from "./API.js";

export default {
    getMarkerData() {
        return API.dataAPI().get('/pos')
    },
    getSumStations() {
        return API.dataAPI().get('/sum')
    }
}