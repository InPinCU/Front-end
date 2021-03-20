import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../services/api-caller.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  products = [];
  
  constructor(private APICaller:ApiCallerService) {
  }

  ngOnInit(): void {

    this.APICaller.sendProductRequest().subscribe((data: [any])=>{
      console.log(data);
    }) 
  }

}
