import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  stationList!: [];
  style_sheet!: [
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
  constructor(private databaseService: DatabaseService) {}

  map!: google.maps.Map;

  ngOnInit(): void {

    this.getTestDone();

    this.loadGoogleMaps().then(() => {
      this.initMap();
    });
    
  }
  getTestDone(): void {
    this.databaseService.getTestDone().subscribe(
      (response) => {
      this.stationList = response;
      console.log(this.stationList); // Process the data as needed
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 47.16249, lng: 19.503304},
      zoom: 7,
      styles: this.style_sheet
    };
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
    // Add markers for measurement device points
    // Replace `data` with your actual data containing device points and average traffic numbers
    const data = [
      { lat: 46.6219, lng: 16.5179, average: 100 },
      { lat: 46.1113, lng: 18.1848, average: 200 }
    ];

    data.forEach(device => {
      const marker = new google.maps.Marker({
        position: { lat: device.lat, lng: device.lng },
        map,
        title: `TEST`
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

