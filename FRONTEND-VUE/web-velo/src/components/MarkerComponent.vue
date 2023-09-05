

<script>

// Attach click event listener to the marker
export function clickMarker(map, marker, content) {
  marker.addListener('click', () => {
    map.setZoom(15);
    map.setCenter(marker.getPosition());
    toggleContent(content);
  });
  //toggleContent(marker.content)
}

export function toggleContent(content) {
  // Create a DOMParser // Parse the HTML string into a Document object
  const doc = new DOMParser().parseFromString(content, 'text/html');
  // Extract the first element from the parsed document
  const divElement = doc.body.firstChild;
  // Now, divElement is a DOM element you can work with
  const parentElement = document.getElementById("mapDiv");
  parentElement.appendChild(divElement);

}

</script> 

