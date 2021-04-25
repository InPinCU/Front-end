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
  allListOfResults:any;
  isClicked:boolean=false;
  clickedLocation?:String=undefined;
  isLoaderVisible:boolean = true;
  placesAPI?:any;
  resetSearch:boolean = true;
  allSelected:boolean = true;
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
    
    const autocomplete = new google.maps.places.Autocomplete(this.searchBar?.nativeElement);
    
    autocomplete.addListener("place_changed",()=>{
      let place = autocomplete.getPlace();

      this.currentLat =  place.geometry!.location.lat();
      this.currentLong = place.geometry!.location.lng();
      this.center = place.geometry!.location.toJSON();
      this.ref.detectChanges();
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
    this.center = {lat:this.currentLat,lng:this.currentLong};
    this.isClicked = false;
    this.clickedLocation = undefined;
    this.showRedoSearchButton = false;
    console.log(this.currentLat)
    console.log(this.currentLong)
    this.isLoaderVisible = true;

    this.APICaller.sendLocationRequest(this.currentLat,this.currentLong).subscribe((data: any)=>{
      console.log(data["results"])
      this.types=[];
      this.listOfResults=[];
      this.allSelected = true;

      this.isLoaderVisible = false;

      this.allListOfResults = data["results"];
      this.allListOfResults.forEach((element: any) => {
          let arr = element["types"].split("|");
          arr.forEach((element2: any) => {
            this.types.push(element2);
          });
          this.listOfResults.push(element);
      });
      this.types = this.types.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      this.types = this.types.map(function(element,index) {
        return {"text":element,"selected":false,"index":index}
      })
      console.log(this.types);
      this.ref.detectChanges();
    })
  }
  filterClicked(type:any){
    console.log(type);
    type.selected = !type.selected;
    this.allSelected = false;
    let selectedTypes = this.types.filter(element => element.selected).map(element => element.text);
    console.log()
    this.listOfResults = this.allListOfResults.filter((element: any) =>{
      console.log(element);
      let arr = element["types"].split("|");
      return selectedTypes.some(r=> arr.includes(r));
    })
    console.log(this.listOfResults);
  }
  allfilterClicked(){
    this.allSelected = !this.allSelected;
    this.types.forEach(element =>{
      element.selected = false;
    })
    if(this.allSelected)
      this.listOfResults = this.allListOfResults;
    else
      this.listOfResults = [];
    console.log(this.listOfResults);
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
