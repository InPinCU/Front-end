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
}
