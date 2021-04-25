import { Component } from '@angular/core';

import {LoginService} from 'src/app/services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trend-map';
  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
  }
  callSignIn(){
    this.loginServ.login();
  }
  callSignOut(){
    this.loginServ.logout();
  }
  get userData() {
    return LoginService.user;
  }
}
