import { Component, OnInit } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import {LoginService} from 'src/app/services/login.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
  }
  callSignIn(){
    this.loginServ.login();
  }
  callSignOut(){
    this.loginServ.logout();

  }
}
