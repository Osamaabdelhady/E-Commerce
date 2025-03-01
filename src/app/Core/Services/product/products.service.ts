import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../Constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get(`${BaseURL.baseUrl}/products`)
  }

  getSpasificProducts(id:string):Observable<any>{
    return this.http.get(`${BaseURL.baseUrl}/products/${id}`)
  }
}

