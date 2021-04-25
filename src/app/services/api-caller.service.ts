import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTService } from './rest.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry ,map } from 'rxjs/operators';
import { AppConstants } from '../constants/RESTConstants';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  products = [];
  constructor(private RESTCaller: RESTService) {
    
  }
  public sendLocationRequest(lat:number , long:number): Observable<any> {
    let finalURL:string = AppConstants.locationAPI+"?lat="+lat+"&long="+long
    return this.RESTCaller.sendGetRequest(finalURL).pipe(map(d=>this.modify(d)));
  }

  public sendLocationDetailsRequest(placesAPIRef:String ,userEmail:string): Observable<any> {
    let finalURL:string = AppConstants.locationDetailsAPI+"?user="+userEmail+"&placesAPIRef="+placesAPIRef;
    return this.RESTCaller.sendGetRequest(finalURL).pipe(map(d=>this.modify(d)));
  }
  public sendFavLocationRequest(userEmail:String ): Observable<any> {
    let finalURL:string = AppConstants.favLocationAPI+"?user="+userEmail;
    return this.RESTCaller.sendGetRequest(finalURL).pipe(map(d=>this.modify(d)));
  }
  public sendFavSetRequest(userEmail:String,placesAPIRef:String,isFav:boolean): Observable<any> {
    let finalURL:string = AppConstants.favSetAPI+"?user="+userEmail+"&placesAPIRef="+placesAPIRef+"&isFav="+(isFav?1:0);
    return this.RESTCaller.sendGetRequest(finalURL).pipe(map(d=>this.modify(d)));
  }
  public sendUserRequest(userEmail:String): Observable<any> {
    let finalURL:string = AppConstants.userAPI+"?user="+userEmail;
    return this.RESTCaller.sendGetRequest(finalURL).pipe(map(d=>this.modify(d)));
  }
  
  modify(data:any){
    data['myOwnProperty'] = "Hey There, I am added by decorator !!"
    return data;
  }
}
