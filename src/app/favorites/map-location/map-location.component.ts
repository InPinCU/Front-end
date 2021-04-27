
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
  @Input()
  markerData: any[] =[];
  @Input()
  center!: google.maps.LatLngLiteral;
  
  @ViewChild('googlemaps') map!: any;
  width = "100%"
  height = "100%"
  @Output() infoWindowOpened = new EventEmitter<any>();
  
  centerMarkers:any[] = []
  markers:any[] = []



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
    
    const currentItem: SimpleChange = changes.markerData;
    if(currentItem){
      if(currentItem.currentValue)
        this.setupOtherMarkers();
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
  
  setupOtherMarkers(){
    this.markers =[];
    let i = 0;
    for (let element of this.markerData){
      i = i + 1;
      this.markers.push({
        position: {lat:Number(element.lat),lng:Number(element.long)},
        label: {
          color: 'black',
          text: element.name,
        },
        index:0,
        title: 'Current Location',
        options: { draggable: false },
        placesAPIRef:element["placesAPIRef"],
        name:element["name"],
        trendingScore:element["trendingScore"]
      })
    }
  }

  ngOnInit(): void {
    this.setupcenterMarker();
  }
  openInfo(marker:any){
    this.infoWindowOpened.emit(marker);
  }


}
