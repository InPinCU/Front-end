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

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FavoritesComponent,
    HeaderComponent,
    PageNotFoundComponent,
    GoogleMapsComponent,
    DetailContainerComponent
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
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
