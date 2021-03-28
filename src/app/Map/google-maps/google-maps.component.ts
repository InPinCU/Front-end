import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  
  @ViewChild('googlemaps') map!: any;
  width = "100%"
  height = "100vh"
  isInfoWindowOpen:boolean = false;

  @Output() centerChangedEvent = new EventEmitter<any>();
  @Output() infoWindowOpened = new EventEmitter<boolean>();
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  centerMarkers:any[] = []
  markers:any[] = []

  @Input()
  center!: google.maps.LatLngLiteral;
  
  options: google.maps.MapOptions = {
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  };

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
  getCenter(event:any){
    let a:google.maps.LatLng = this.map.getCenter();
    this.centerChangedEvent.emit(a.toJSON());
  }


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
    console.log(this.center);
    this.markers.push({
      position: this.markerPositions[this.markerPositions.length - 1],
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      index:this.markers.length,
      title: 'Marker title ' + (this.markers.length + 1),
      options: { draggable: false},
      id:this.markers.length + 1
    })
  }
}
