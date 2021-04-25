import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule} from  '@angular/material/Icon';
import { MatListModule} from  '@angular/material/list';
import { MatButtonModule} from  '@angular/material/button';
import { MatSidenavModule} from  '@angular/material/sidenav';
import {  MatFormFieldModule} from  '@angular/material/form-field';
import {  MatInputModule} from  '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsComponent } from './map/google-maps/google-maps.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { DetailContainerComponent } from './map/detail-container/detail-container.component';
import { InstaComponent } from './map/detail-container/insta/insta.component';
import {MatChipsModule} from '@angular/material/chips';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';
import { environment} from 'src/environments/environment'

/* Configure Amplify resources */
Amplify.configure({
  Auth: {

      // REQUIRED - Amazon Cognito Region
      region: 'US-EAST-1',


      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_V4pKjk42Z',

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: environment.userPoolWebClientId,

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: false,

      // OPTIONAL - Configuration for cookie storage
      /*// Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
          domain: 'trendmappr.com',
      // OPTIONAL - Cookie path
          path: '/',
      // OPTIONAL - Cookie expiration in days
          expires: 365,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
          sameSite: "lax",
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
          secure: false
      },*/


       // OPTIONAL - Hosted UI configuration
      oauth: {
          domain: 'trendmap.auth.us-east-1.amazoncognito.com/',
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn:  environment.redirectSignIn,
          redirectSignOut: environment.redirectSignOut,
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FavoritesComponent,
    HeaderComponent,
    PageNotFoundComponent,
    GoogleMapsComponent,
    DetailContainerComponent,
    InstaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    GoogleMapsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
