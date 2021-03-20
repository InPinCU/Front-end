import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {



  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBpRalwKKTJE-5Gl0WiRdar5Zyvvt4CDkE', 'callback')
        .pipe(
          map(() => true),
          catchError(() => of(false)),
        );
  }
  ngOnInit(): void {

  }
}