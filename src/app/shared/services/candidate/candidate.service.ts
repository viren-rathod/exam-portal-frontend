import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateDataRequest, CandidateResponse, CandidateResponsePaginated } from '../../models/api/candidate.model';
import { Observable } from 'rxjs';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  public getCandidates(data: CandidateDataRequest): Observable<CandidateResponsePaginated> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size);
    return this.http.get<CandidateResponsePaginated>(`${BASE_URL}/api/user/paginated`, { params });
  }

  public getAllCandidates(): Observable<CandidateResponse> {
    return this.http.get<CandidateResponse>(`${BASE_URL}/api/user/`);
  }
}
