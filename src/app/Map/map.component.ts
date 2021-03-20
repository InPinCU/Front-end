import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  products = [];
  showRedoSearchButton:boolean = false;
  
  center: google.maps.LatLngLiteral={lat:0.5,lng:0.5};

  constructor(private APICaller:ApiCallerService) {
  }

  ngOnInit(): void {

    this.APICaller.sendProductRequest().subscribe((data: [any])=>{
      console.log(data);
    })
  }
  centerChangedEvent(event:any){
    this.showRedoSearchButton = true;
  }
  redoSearch(){
    this.showRedoSearchButton = false;

  }

}
