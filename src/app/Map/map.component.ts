import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { GeneralConstants } from '../constants/generalConstants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  products = [];
  showRedoSearchButton:boolean = false;
  currentLat:number=GeneralConstants.defaultLat;
  currentLong:number=GeneralConstants.defaultLong;
  listOfResults:any;
  isClicked:boolean=false;
  clickedLocation?:String=undefined;
  
  center: google.maps.LatLngLiteral={lat:this.currentLat,lng:this.currentLong};

  constructor(private APICaller:ApiCallerService) {
  }

  ngOnInit(): void {

    this.APICaller.sendLocationRequest(GeneralConstants.defaultLat,GeneralConstants.defaultLong).subscribe((data: [any])=>{
      console.log(data);
    })
  }
  centerChangedEvent(event:any){
    this.showRedoSearchButton = true;
    this.currentLat = event.lat;
    this.currentLong = event.lng
  }
  redoSearch(){
    this.showRedoSearchButton = false;
    
    this.APICaller.sendLocationRequest(this.currentLat,this.currentLong).subscribe((data: any)=>{
      console.log(data);
      this.listOfResults = data["results"];
    })
  }

  infoWindowOpened(marker:any){
    console.log(marker);
    this.isClicked = !this.isClicked;
    this.clickedLocation = marker.id;
  }

}
