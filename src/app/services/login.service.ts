import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BASE_URL from './util';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //login users
  public loginUser(loginData: any) {
    console.log(loginData);
    return this.http.post(`${BASE_URL}/api/auth/login`, loginData);
  }
}
