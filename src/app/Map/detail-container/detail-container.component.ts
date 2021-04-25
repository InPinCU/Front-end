import { Component, OnInit,Input, SimpleChanges, SimpleChange } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ApiCallerService } from 'src/app/services/api-caller.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.scss']
})
export class DetailContainerComponent implements OnInit {

  @Input()
  placesAPI?: any;
  score = 0;
  scoreNum:number = 0;
  myColor: string="";
  loading:boolean = true;
  rating?:Number;
  yelpInfo?:any;
  instaInfo?:any;
  isFavorite?:boolean;
  instaInfoArr:any[]=[];
  
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';

  constructor(private APICaller:ApiCallerService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.placesAPI;
    if(currentItem.currentValue){
      this.callDetailsFunction();
    }
  }
  callDetailsFunction(){
    console.log("============");
    console.log(this.placesAPI["placesAPIRef"] ?? "");
    console.log(this.placesAPI["name"] ?? "");
    this.loading = true;
    this.score = this.placesAPI.score;
    this.scoreNum = this.placesAPI.score;
    this.APICaller.sendLocationDetailsRequest(this.placesAPI["placesAPIRef"]  ?? "",this.userData.attributes.email).subscribe((data: any)=>{
      this.loading = false;
      console.log(data["results"])
      if ("yelp" in data["results"]){
        this.rating = data["results"]["yelp"]["yelp_info"].rating;
        this.yelpInfo = data["results"]["yelp"]["yelp_info"];
      }else{
        this.rating = undefined;
        this.yelpInfo = undefined;
      }
      if ("favorite" in data["results"]){
        this.isFavorite = data["results"]["favorite"]
      }else{
        this.isFavorite = undefined;
      }
      if ("insta" in data["results"] && "recPosts" in data.results.insta){
        let instaInfo = data["results"]["insta"];
        this.instaInfo = instaInfo;
       
        var arr:any[]=[];
        this.instaInfoArr =  Object.keys(instaInfo["recPosts"]).map(function(key){
                                return instaInfo["recPosts"][key];  
                            });  
      }else{
        this.instaInfoArr = [];
        this.instaInfo = undefined;
      }
    })
  }

  get userData() {
    return LoginService.user;
  }
  markAsFavorite(flag:boolean){
    
    this.APICaller.sendFavSetRequest(this.userData.attributes.email,this.placesAPI["placesAPIRef"]  ?? "",flag).subscribe((data: any)=>{
     this.isFavorite = data["markAsFav"] == 1 ? true : false;
    })
  }
}
