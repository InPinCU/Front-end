import { Component, OnInit,Input, SimpleChanges, SimpleChange } from '@angular/core';
import { ApiCallerService } from 'src/app/services/api-caller.service';

@Component({
  selector: 'app-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.scss']
})
export class DetailContainerComponent implements OnInit {

  @Input()
  placesAPI?: any;
  myColor: string="";
  loading:boolean = true;
  rating?:Number;
  yelpInfo?:any;
  instaInfo?:any;
  

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
    this.APICaller.sendLocationDetailsRequest(this.placesAPI["placesAPIRef"]  ?? "").subscribe((data: any)=>{
      this.loading = false;
      console.log(data["results"])
      if ("yelp" in data["results"]){
        this.rating = data["results"]["yelp"]["yelp_info"].rating;
        this.yelpInfo = data["results"]["yelp"]["yelp_info"];
      }else{
        this.rating = undefined;
        this.yelpInfo = undefined;
      }
    })
  }

}
