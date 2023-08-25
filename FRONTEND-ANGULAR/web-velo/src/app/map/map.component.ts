import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // variables for GoogleMaps API
  style_sheet = [
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
  icon = {
    path : "M480.059-486.667q30.274 0 51.774-21.559t21.5-51.833q0-30.274-21.559-51.774t-51.833-21.5q-30.274 0-51.774 21.559t-21.5 51.833q0 30.274 21.559 51.774t51.833 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z",
    fillColor: "#E1EF79",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#000000",
    scale: 0.03,
  }

  map!: google.maps.Map;
 
  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {

    this.loadGoogleMaps().then(() => {
      this.initMap();
    });
    
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 47.16249, lng: 19.503304},
      zoom: 7,
      styles: this.style_sheet
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    const content =
    '<div id="content">' +
      '<p> data </p>' +
      '<p>Valami content van itt</p>' +
    '</div>';


// function for creating popup & zoom in to marker when its clicked
    function clickMarker( marker: google.maps.Marker, infowin : google.maps.InfoWindow)
    {
      // when marker clicked zooms into it
      marker.addListener("click", () => {
        map.setZoom(15);
        map.setCenter(marker.getPosition() as google.maps.LatLng);
        infowin.open({
          anchor: marker,
          map,
        });
      });
    }
    
    const data : any[] = [];
    const mesdata : any[] = [];

    const getMeasData = (id: any) => {
      this.databaseService.getData(id).subscribe((datasets) => {
        datasets.forEach(result => {
          mesdata.push(result)
        })
        mesdata.forEach(result => {
          const start_date = result.StationID;
          return start_date
        })
      });
    }

    this.databaseService.getPos().subscribe((positions) => {
      positions.forEach(pos => {
        data.push(pos)
      })
      data.forEach(station => {
        const id = station.StationID;
        const name = station.StationName;
        const lat = parseFloat(station.posLatitude);
        const lng = parseFloat(station.posLongitude);
        const data = getMeasData(id);
        const marker = new google.maps.Marker({
          id: id,
          position: { lat, lng },
          map,
          icon: this.icon,
          title: name,
        })
        const content =
        '<div>' +
          `<p> ID: ${id} </p>`+
          `<p> Name: ${name} </p>` +
          `<p> data: ${data} </p>` +
        '</div>';
        const infowin = new google.maps.InfoWindow({
          content: content,
        })
        clickMarker(marker, infowin);
      });
    });
  }

  private loadGoogleMaps(): Promise<void> {
    if (!window.google || !window.google.maps || !window.google.maps.Map) {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrqeOVzVOTRdPZh_VoEN1epBl04KoxJlc';
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    } else {
      return Promise.resolve();
    }
  }
  
}
