import { Component, OnInit,Input, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-detail-container',
  templateUrl: './detail-container.component.html',
  styleUrls: ['./detail-container.component.scss']
})
export class DetailContainerComponent implements OnInit {

  @Input()
  placesAPIRef?: String;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.placesAPIRef;
    console.log('prev value: ', currentItem.previousValue);
    console.log('got item: ', currentItem.currentValue);
    if(currentItem.currentValue){
      this.callDetailsFunction();
    }
  }
  callDetailsFunction(){
    console.log("============");
    console.log(this.placesAPIRef);
  }

}
