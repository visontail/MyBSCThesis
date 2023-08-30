

<script>


export default {
    methods: {
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