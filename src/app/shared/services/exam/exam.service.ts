import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddExamResponse,
  Exam,
  ExamDataRequest,
  ExamResponse,
} from '../../models/api/exam.model';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  /**
   * Get All Exams with filter and Pagination
   * @param data
   * @returns
   */
  public getExams(data: ExamDataRequest): Observable<ExamResponse> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size);
    // .append('sortField', data.sortField)
    // .append('sortOrder', data.sortOrder)
    // .append('search', encodeURIComponent(data.searchData.trim()))
    // .append('filter', JSON.stringify(filterData))
    return this.http.get<ExamResponse>(`${BASE_URL}/api/exam/`, { params });
  }

  /**
   *  Get all Exams
   */
  public getAllExams(): Observable<ExamResponse> {
    return this.http.get<ExamResponse>(`${BASE_URL}/api/exam/`);
  }

  public addExam(data: Exam): Observable<AddExamResponse> {
    return this.http.post<AddExamResponse>(`${BASE_URL}/api/exam`, data);
  }
}
