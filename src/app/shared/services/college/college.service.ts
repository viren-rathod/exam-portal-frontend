import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import BASE_URL from '../util';
import { BaseResponse } from '../../models/base-response.model';

export interface CollegeItem {
  id: number;
  name: string;
}

export interface CollegeListResponse extends BaseResponse {
  data: CollegeItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http: HttpClient) {}

  public getAllColleges(): Observable<CollegeListResponse> {
    return this.http.get<CollegeListResponse>(`${BASE_URL}/api/college/`);
  }
}
