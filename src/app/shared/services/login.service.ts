import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BASE_URL from './util';
import { Router } from '@angular/router';
import {
  User,
  UserLoginRequest,
  UserLoginResponse,
} from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  //login users
  public loginUser(loginData: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(
      `${BASE_URL}/api/auth/login`,
      loginData
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/api/auth/getCurrentUser`);
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  public isUserLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  public removeTokenFromStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    return true;
  }

  public getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  public setUserDetailsLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * getUserDetailsFromLocalStorage
   */
  public getUserDetailsFromLocalStorage() {
    let userInfo = localStorage.getItem('user');
    // console.log("userinfo --> ",userInfo);
    if (userInfo != null) {
      return JSON.parse(userInfo);
    } else {
      this.removeTokenFromStorage();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUserDetailsFromLocalStorage();
    // console.log(user);
    return user.roles[0].name;
  }
}
