import dataAPI from "./API.js";

export default {
    getMarkerData() {
        return dataAPI().get('/pos')
    },
    getSumStations() {
        return dataAPI().get('/sum')
    }
}