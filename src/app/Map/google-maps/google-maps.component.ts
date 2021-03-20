import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
 
  width = "100%"
  height = "100vh"
  isInfoWindowOpen = false;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  centerMarkers:any[] = []
  markers:any[] = []

  center: google.maps.LatLngLiteral= {lat:0,lng:0.5};
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  openInfo(markerInfo:any){
    console.log(markerInfo)
    if(!this.isInfoWindowOpen){
      this.width = "70%";
      this.isInfoWindowOpen = true;
    }
    else{
      this.width = "100%"
      this.isInfoWindowOpen = false;

    }
  }
  addMarkerToPoint(event: google.maps.MapMouseEvent) {
    
    this.markerPositions.push(event.latLng.toJSON());

    this.markers.push({
      position: this.markerPositions[this.markerPositions.length - 1],
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      index:this.markers.length,
      title: 'Marker title ' + (this.markers.length + 1),
      options: { draggable: false},
    })
  }
  constructor(httpClient: HttpClient) {
    //this.center = {lat:0,lng:0.5};
  }
  
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.centerMarkers =[{
        position: this.center,
        label: {
          color: 'red',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        index:this.markers.length,
        title: 'Marker title ' + (this.markers.length + 1),
        options: { draggable: false },
      }]
    })

  }
  reduceWidth(){
    if(this.width == "100%")
      this.width = "70%"
    else
      this.width = "100%"
    this.addMarker();
  }
  addMarker() {
    debugger;
    this.markerPositions.push({
      lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
      lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    });
    this.markers.push({
      position: this.markerPositions[this.markerPositions.length - 1],
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      index:this.markers.length,
      title: 'Marker title ' + (this.markers.length + 1),
      options: { draggable: false },
    })
  }
}
