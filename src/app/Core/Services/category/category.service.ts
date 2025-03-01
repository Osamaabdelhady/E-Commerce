import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../Constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  token:any;
  constructor(private http:HttpClient) { }

  getALlCategory():Observable<any>{
    return this.http.get(`${BaseURL.baseUrl}/categories`)
  }

}
