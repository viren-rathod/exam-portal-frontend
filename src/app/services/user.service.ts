import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BASE_URL from './util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //Adding users
  public addUser(user: any) {
    return this.http.post(`${BASE_URL}/api/auth/register`, user);
  }
}
