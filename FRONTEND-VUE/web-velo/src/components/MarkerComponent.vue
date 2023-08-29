
<script>

import axios from 'axios'

/* global google */

let icon = {
    path : "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
    fillColor: "#E1EF79",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#000000",
    scale: 0.03,
}

// API URL
const apiUrl = 'http://localhost:8080';

export default {
    data() {
        return {
            markers: [], 
        };
    },
    // ROLITÓL MEGKÉRDEZNI
    created() {
        this.fetchPosData();
    },
    methods: {
        // Fumction for getting Stations' positions (lat, lng), ID, and name
        getPos() {
        return axios.get(`${apiUrl}/pos`)
            .then(response => response.data)
            .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
            });
        },
        async fetchPosData() {
            try {
                const positions = this.getPos().data;

                positions.forEach(pos => {
                    const id = pos.StationID;
                    const name = pos.StationName;
                    const lat = parseFloat(pos.posLatitude);
                    const lng = parseFloat(pos.posLongitude);

                    const marker = new google.maps.Marker({
                        id: id,
                        position: { lat, lng },
                        map: this.$refs.map,
                        icon: icon,
                        title: name,
                    });
                    this.clickMarker(marker);
                    this.markers.push(marker);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            },

        clickMarker(marker) {
            // Attach click event listener to the marker
            marker.addListener('click', () => {
                this.map.setZoom(15);
                this.map.setCenter(marker.getPosition());
            });
        },
    }    
}


</script>