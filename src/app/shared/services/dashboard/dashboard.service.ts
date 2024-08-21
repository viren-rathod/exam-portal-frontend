import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import BASE_URL from "../util";
import { ActiveExamResponse, GetActiveExamsRequest } from "../../models/api/exam.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  public getActiveExams(data: GetActiveExamsRequest): Observable<ActiveExamResponse> {
    let params = new HttpParams()
      .append('userId', data.id ?? '')
      .append('page', data.page)
      .append('sortField', data.sortField ?? '')
      .append('sortOrder', data.sortOrder ?? '')
      .append('status', data.status ?? '')
      .append('searchData', encodeURIComponent(data.searchData));

    return this.http.get<ActiveExamResponse>(`${BASE_URL}/api/exam/active`, { params });
  }
}
