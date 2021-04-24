import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';
import { GeneralConstants } from '../constants/generalConstants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterContentInit {

  types:any[] = [];
  showRedoSearchButton?:boolean;
  currentLat:number=GeneralConstants.defaultLat;
  currentLong:number=GeneralConstants.defaultLong;
  listOfResults:any;
  isClicked:boolean=false;
  clickedLocation?:String=undefined;
  isLoaderVisible:boolean = true;
  placesAPI?:any;
  resetSearch:boolean = true;
  @ViewChild('searchBar',{static: true}) searchBar?: ElementRef;
  
  center: google.maps.LatLngLiteral={lat:this.currentLat,lng:this.currentLong};

  constructor(private APICaller:ApiCallerService,private ref: ChangeDetectorRef) {
  }

  ngAfterContentInit(){
    const options = {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["restaurant"],
    };
    console.log(this.searchBar)
    const autocomplete = new google.maps.places.Autocomplete(this.searchBar?.nativeElement);
    autocomplete.addListener("place_changed",()=>{
      let place = autocomplete.getPlace();

      console.log(this.center.lat)
      console.log(this.center.lng)
      console.log(place);
      this.center = place.geometry!.location.toJSON();
      this.ref.detectChanges();
      console.log(this.center.lat)
      console.log(this.center.lng)
      this.redoSearch();
    })
  }
  searchPerformed(place:any){
    console.log(place);
  }

  centerChangedEvent(event:any){

    this.showRedoSearchButton = true;
    this.currentLat = event.lat;
    this.currentLong = event.lng;


    if(event.reset){
      this.redoSearch();
    }
  }
  redoSearch(){
    this.isClicked = false;
    this.clickedLocation = undefined;
    this.showRedoSearchButton = false;
    console.log(this.currentLat)
    console.log(this.currentLong)
    this.isLoaderVisible = true;

    this.APICaller.sendLocationRequest(this.currentLat,this.currentLong).subscribe((data: any)=>{
      console.log(data["results"])
      
      this.isLoaderVisible = false;
      this.listOfResults = data["results"];
      this.listOfResults.forEach((element: any) => {
          this.types.push(element["types"]);
      });
      this.types = this.types.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      console.log(this.types);
      this.ref.detectChanges();
    })
  }

  infoWindowOpened(marker:any){
    console.log(marker);
    if(!this.clickedLocation)
      this.isClicked = true;
    else if(this.clickedLocation == marker.id){
      this.isClicked =  !this.isClicked;
      return;
    }
    else
      this.isClicked = true;
    
    let output = {"placesAPIRef":marker.id,"name":marker.placesName}
    this.placesAPI = output;
    this.clickedLocation = marker.id;
      
  }
  loadingDone(event:any){
    this.isLoaderVisible = false;

  }
}
