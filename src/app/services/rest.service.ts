import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constants/RESTConstants'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RESTService {


  constructor(private httpClient: HttpClient) {
    
  }
  public sendGetRequest(){
    return this.httpClient.get(AppConstants.REST_API_SERVER+AppConstants.productAPI);
  }
}
