import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  constructor(private HttpClient :HttpClient) { }

  get(url:string):Observable<any>{
    return this.HttpClient.get(url);
  }

  post(url:string,data:any,reponseType?:any) : Observable<any>{
    return this.HttpClient.post(url,data,reponseType);
  }

  delete(url:string,data:any):Observable<any>{
    return this.HttpClient.delete(url,data)
  }

}
