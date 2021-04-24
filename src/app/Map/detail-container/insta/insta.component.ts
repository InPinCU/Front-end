import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-insta',
  templateUrl: './insta.component.html',
  styleUrls: ['./insta.component.scss']
})
export class InstaComponent implements OnInit {
  @Input() instaInfoArr?:any[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.instaInfoArr);
  }

}
