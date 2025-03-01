import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseURL } from '../../Constant/baseURL';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token:any;
  cardNumbers:BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) id:object) { 

    if(isPlatformBrowser(id)){
      this.token = {Token:localStorage.getItem('UserToken') || ""};
    }

    this.getProductRoCart().subscribe({
      next:(res)=>{
        this.cardNumbers.next(res.numOfCartItems)
      }
    })
  }

  addProductRoCart(productId:string):Observable<any>{
    return this.http.post(`${BaseURL.baseUrl}/cart`,
    {productId}
    )
  }

  getProductRoCart():Observable<any>{
    return this.http.get(`${BaseURL.baseUrl}/cart`
    )
  }

  updateProductRoCart(productId:string,count:number):Observable<any>{
    return this.http.put(`${BaseURL.baseUrl}/cart/${productId}`,
    {count:count}
    )
  }

  removeProductRoCart(productId:string):Observable<any>{
    return this.http.delete(`${BaseURL.baseUrl}/cart/${productId}`
    )
  }

  clearCart():Observable<any>{
    return this.http.delete(`${BaseURL.baseUrl}/cart`
    )
  }

  checkOut(cardID:any,payload:any):Observable<any>{
    return this.http.post(`${BaseURL.baseUrl}/orders/checkout-session/${cardID}?url=http://localhost:4200/`,{
      shippingAddress:payload
    })
  }
}
