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

    this.APICaller.sendLocationDetailsRequest(this.placesAPI["placesAPIRef"]  ?? "").subscribe((data: any)=>{
      console.log(data);
      console.log(data["results"])
    })
  }

}
