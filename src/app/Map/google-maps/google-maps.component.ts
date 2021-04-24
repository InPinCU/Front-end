import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Input,Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { GeneralConstants } from '../../constants/generalConstants';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnChanges {
  
  @ViewChild('googlemaps') map!: any;
  width = "100%"
  height = "70vh"
  isInfoWindowOpen:boolean = false;

  @Output() centerChangedEvent = new EventEmitter<any>();
  @Output() infoWindowOpened = new EventEmitter<any>();
  @Output() loadingDone = new EventEmitter<any>();
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  centerMarkers:any[] = []
  markers:any[] = [] 
  imageIconLink ="../../../assets/fire-icon.png";
  imageIcon = {
    url: this.imageIconLink, // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
    labelOrigin: new google.maps.Point(0, 30)
  };


  @Input()
  center!: google.maps.LatLngLiteral;

  @Input()
  listOfResults!: any;
  
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
    //this.center = {lat:0,lng:0.5};
  }
  
  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.listOfResults;
    if(currentItem){
      if(currentItem.currentValue)
        this.updateMarkers();
    }

    /*const newCenter: SimpleChange = changes.center;
    console.log(newCenter)
    if(newCenter){
      console.log(newCenter.currentValue)
      if(newCenter.currentValue)
        this.updateMarkers();
    }*/
  }
  
  updateMarkers(){
    this.setupcenterMarker();
    this.markers=[];
    for (let row of this.listOfResults){
      
      let curentPosition:google.maps.LatLngLiteral= {
        lat: Number(row["lat"]),
        lng: Number(row["long"])
      }
      let factor = row.trendingScore / 100;
      let newImageIcon = {
        url: this.imageIcon.url, // url
        scaledSize:  this.imageIcon.scaledSize, // scaled size
        origin: this.imageIcon.origin, // origin
        anchor: this.imageIcon.anchor, // anchor
        labelOrigin: this.imageIcon.labelOrigin
      };
      factor = factor < 0.5? 0.5 :factor;
      newImageIcon.scaledSize = new google.maps.Size(30*factor, 30*factor)

      this.markers.push({
        position: curentPosition,
        label: {
          color: 'black',
          text: row["name"],
        },
        index:this.markers.length,
        title: row["name"],
        options: { 
          icon: newImageIcon,draggable: false},
        id:row["placesAPIRef"],
        placesName:row["name"]
      })
    }

    this.loadingDone.emit();

  }
  setupcenterMarker(){
    this.centerMarkers =[{
      position: this.center,
      label: {
        color: 'black',
        text: 'You',
      },
      index:this.markers.length,
      title: 'Current Location',
      options: { draggable: false },
    }]
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      let finalOutput = {
        lat: this.center.lat,
        lng: this.center.lng,
        reset:true
      }
      this.centerChangedEvent.emit(finalOutput);
    }, failure => {
      
      this.center = {
        lat: GeneralConstants.defaultLat,
        lng: GeneralConstants.defaultLong,
      }
      let finalOutput = {
        lat: this.center.lat,
        lng: this.center.lng,
        reset:true
      }
      this.centerChangedEvent.emit(finalOutput);

      if (failure.message.startsWith("Only secure origins are allowed")) {
        // Secure Origin issue.
      }
    })
  }

  getCenter(event:any){
    let output:google.maps.LatLng = this.map.getCenter();
    this.centerChangedEvent.emit(output.toJSON());
  }


  openInfo(markerInfo:any){
    console.log(markerInfo)
    this.infoWindowOpened.emit(markerInfo);
    /*if(!this.isInfoWindowOpen){
      this.width = "70%";
      this.isInfoWindowOpen = true;
    }
    else{
      this.width = "100%"
      this.isInfoWindowOpen = false;
    }*/
  }
  addMarkerToPoint(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    /*this.markers.push({
      position: this.markerPositions[this.markerPositions.length - 1],
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      index:this.markers.length,
      title: 'Marker title ' + (this.markers.length + 1),
      options: { draggable: false},
      id:this.markers.length + 1
    })*/
  }
}
