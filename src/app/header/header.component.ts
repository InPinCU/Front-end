import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import {LoginService} from 'src/app/services/login.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() login = new EventEmitter<any>();
  @Output() logout = new EventEmitter<any>();
  @Input() user:any;
  
  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
  }
  callSignIn(){
    this.login.emit();
    //this.loginServ.login();
  }
  callSignOut(){
    this.logout.emit();
    //this.loginServ.logout();

  }
}
