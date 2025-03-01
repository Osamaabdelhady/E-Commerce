import { JwtPayload } from './../../../../node_modules/jwt-decode/build/cjs/index.d';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../Shared/Interface/auth';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BaseURL } from '../Constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);

  constructor(private _http:HttpClient,@Inject(PLATFORM_ID) Id:object,  private router:Router) {
    if(isPlatformBrowser(Id)){
      if(localStorage.getItem('UserToken') !== null){
        this.decodeUser();
      }
    }
   }

  register(formdata:Auth):Observable<any>{
    return this._http.post(`${BaseURL.baseUrl}/auth/signup`,formdata)
  }

  login(formdata:Auth){
    return this._http.post(`${BaseURL.baseUrl}/auth/signin`,formdata)
  }

  decodeUser(){
    const token = localStorage.getItem('UserToken')||'';
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData);
  }


  logOut(){
    localStorage.removeItem('UserToken');
    this.userData.next(null);
    this.router.navigate(['/login'])
  }
}
