import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../../Shared/Interface/auth';
import { BaseURL } from '../../Constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http:HttpClient) { }

  verfyEmail(payload:Auth):Observable<any>{
    return this.http.post(`${BaseURL.baseUrl}/auth/forgotPasswords`,payload)
  }

  verfyCode(payload:Auth):Observable<any>{
    return this.http.post(`${BaseURL.baseUrl}/auth/verifyResetCode`,payload)
  }

  resetpassword(payload:Auth):Observable<any>{
    return this.http.post(`${BaseURL.baseUrl}/auth/resetPassword`,payload)
  }
}
