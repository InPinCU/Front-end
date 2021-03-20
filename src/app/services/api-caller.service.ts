import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTService } from './rest.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry ,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  products = [];
  constructor(private RESTCaller: RESTService) {
    
  }
  public sendProductRequest(): Observable<[any]> {
    return this.RESTCaller.sendGetRequest().pipe(map(d=>this.modify(d)));
  }
  
  modify(data:any){
    data['myOwnProperty'] = "Hey There, I am added by decorator !!"
    return data;
  }
}
