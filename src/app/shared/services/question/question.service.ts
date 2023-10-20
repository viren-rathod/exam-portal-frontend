import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../util';
import { QuestionResponsePaginated, QuestionDataRequest, QuestionResponse } from '../../models/api/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  /**
   *  Get all Questions
   */
  public getAllQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${BASE_URL}/api/questions/`)
  }

  public getQuestions(data: QuestionDataRequest): Observable<QuestionResponsePaginated> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size);
    return this.http.get<QuestionResponsePaginated>(`${BASE_URL}/api/questions/`, { params });
  }
}
