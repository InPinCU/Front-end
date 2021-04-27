import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {LoginService} from 'src/app/services/login.service'
import { GeneralConstants } from '../constants/generalConstants';
import { ApiCallerService } from '../services/api-caller.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  isClicked = false;
  placesAPI:any;
  dataSource:any[]=[];
  displayedColumns: string[] = [ 'name'];
  currentLat:number=GeneralConstants.defaultLat;
  currentLong:number=GeneralConstants.defaultLong;
  center: google.maps.LatLngLiteral={lat:this.currentLat,lng:this.currentLong};

  constructor(private APICaller:ApiCallerService,private ref: ChangeDetectorRef,public loginServ: LoginService) {
  }

  ngOnInit(): void {
    this.getListOfFavorites();
  }
  getListOfFavorites(){
    this.APICaller.sendFavLocationRequest(this.userData.attributes.email).subscribe((data: any)=>{
      console.log(data["results"]);

      this.dataSource = data["results"];
      if (this.dataSource.length >0){
        let element = this.dataSource[0];
        this.placesAPI = {name: element.name, score: element.trendingScore, placesAPIRef: element.placesAPIRef};
        this.center = {lat:Number(element.lat),lng:Number(element.long)};
      }
      this.ref.detectChanges();
    })
  }

  get userData() {
    return LoginService.user;
  }
  showLocation(element:any){
    this.isClicked = true;
    this.placesAPI = {name: element.name, score: element.trendingScore, placesAPIRef: element.placesAPIRef};
    this.center = {lat:Number(element.lat),lng:Number(element.long)};
  }
  closePane(){
    this.isClicked = false;
  }
  infoWindowOpened(element:any){
    if(this.isClicked == false){
      this.isClicked = true;
      this.placesAPI = {name: element.name, score: element.trendingScore, placesAPIRef: element.placesAPIRef};
      this.center = {lat:Number(element.position.lat),lng:Number(element.position.lng)};
    }else{
      if(this.placesAPI.placesAPIRef == element.placesAPIRef){
        this.isClicked = false;
      }else{
        this.placesAPI = {name: element.name, score: element.trendingScore, placesAPIRef: element.placesAPIRef};
        this.center = {lat:Number(element.position.lat),lng:Number(element.position.lng)};

      }
    }
  }
}
