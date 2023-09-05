import API from "./API";

export default {
    getPositions() {
        return API().get('/pos')
    }
}


/* 

async getPos() {
          try {
              const response = await axios.get(`${apiUrl}/pos`);
              this.marker = response.data;
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
          }
        },
        async  fetchPosData() {
            try {
                const positions = this.marker;
                for (const pos of positions) {
                    const id = pos.StationID;
                    const name = pos.StationName;
                    const lat = parseFloat(pos.posLatitude);
                    const lng = parseFloat(pos.posLongitude);
        });
                    const marker = new google.maps.Marker({
                        id: id,
                        position: { lat, lng },
                        map: this.map,
                        icon: icon,
                        title: name,
                    });
                    this.clickMarker(marker)
                    };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

*/