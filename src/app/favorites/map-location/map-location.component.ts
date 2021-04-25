
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Input,Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { GeneralConstants } from '../../constants/generalConstants';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.scss']
})
export class MapLocationComponent implements OnInit {

  @Input()
  placesAPI?: any;
  
  @ViewChild('googlemaps') map!: any;
  width = "100%"
  height = "70vh"
  
  centerMarkers:any[] = []


  @Input()
  center!: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles:[
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
  };

  constructor(httpClient: HttpClient) {
  }
  

  
  ngOnChanges(changes: SimpleChanges) {
    const newCenter: SimpleChange = changes.center;
    if(newCenter){
      if(newCenter.currentValue)
        this.setupcenterMarker();
    }
  }
  
  setupcenterMarker(){
    this.centerMarkers =[{
      position: this.center,
      label: {
        color: 'black',
        text: this.placesAPI.name,
      },
      index:0,
      title: 'Current Location',
      options: { draggable: false },
    }]
  }

  ngOnInit(): void {
    this.setupcenterMarker();
  }


}
