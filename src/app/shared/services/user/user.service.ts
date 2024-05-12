import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import BASE_URL from '../util';
import {UserRegistrationRequest} from '../../models/auth.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  //Adding users
  public addUser(user: UserRegistrationRequest): Observable<Record<string, string>> {
    return this.http.post<Record<string, string>>(`${BASE_URL}/api/auth/register`, user);
  }
}
