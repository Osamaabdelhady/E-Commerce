import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseURL } from '../../Constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  token:any;
    cardNumbers:BehaviorSubject<any> = new BehaviorSubject<any>(0);
  
    constructor(private http:HttpClient, @Inject(PLATFORM_ID) id:object) { 
  
      if(isPlatformBrowser(id)){
        this.token = {Token:localStorage.getItem('UserToken') || ""};
      }
  
      this.getBrands().subscribe({
        next:(res)=>{
          this.cardNumbers.next(res.numOfCartItems)
        }
      })
    }


    getBrands():Observable<any>{
        return this.http.get(`${BaseURL.baseUrl}/brands`
        )
      }
}
