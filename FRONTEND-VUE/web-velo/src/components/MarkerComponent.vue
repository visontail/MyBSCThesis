

<script>

// Attach click event listener to the marker
export function clickMarker(map,marker) {
    marker.addListener('click', () => {
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    });
}


</script>