import { Component, OnInit } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import {LoginService} from 'src/app/services/login.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginServ: LoginService) { }

  ngOnInit(): void {
    this.loginServ.getLoggedInUser();
  }
  callSignIn(){
    this.loginServ.login();
  }
}
