import { Injectable } from '@angular/core';

import { Auth , Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static user:any;
  static userExtraData:any;
  constructor() {
    
    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log(event);
      console.log(data);
      if (event === "cognitoHostedUI" || event === "signedIn") {
        LoginService.userExtraData = data;
      }
    });

    //currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then((data) => {
        LoginService.user = data;
      }).catch((err) => {
        console.log(err);
      })
   }
  getLoggedInUser(){
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  login(){
    Auth.federatedSignIn()
  }
  logout(){
    Auth.signOut();

  }
}
