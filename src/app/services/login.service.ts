import { Injectable } from '@angular/core';

import { Auth , Hub } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user:any;
  constructor() {
    
    // Used for listening to login events
    Hub.listen("auth", ({ payload: { event, data } }) => {
      debugger;
      console.log(event);
      console.log(data);
      if (event === "cognitoHostedUI" || event === "signedIn") {
        this.user = data;
      }
      Auth.currentAuthenticatedUser()
      .then((data) => {
        this.user = data;
      }).catch((err) => {
        debugger;
        console.log(err);
      })
    });

    //currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.user = data;
      }).catch((err) => {
        debugger;
        console.log(err);
      })
   }
  getLoggedInUser(){
    debugger;
    Auth.currentUserCredentials().then(userData=>{
      //debugger;
      console.log(userData);
    }).catch((e) => {
      //debugger;
      console.log(e)
    });;
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  login(){
    Auth.federatedSignIn()
  }
}
