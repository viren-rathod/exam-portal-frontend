import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../util';
import {
  QuestionResponsePaginated,
  QuestionDataRequest,
  QuestionResponse,
  GetQuestionResponse,
  AddQuestionResponse,
  DeleteQuestionResponse,
  MapObject,
} from '../../models/api/question.model';
import { QuestionAnswerResponse } from '../../models/api/option.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  /**
   *  Get all Questions
   */
  public getAllQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(`${BASE_URL}/api/questions/`);
  }

  public getQuestions(
    data: QuestionDataRequest
  ): Observable<QuestionResponsePaginated> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size)
      .append('sortField', data.sortField)
      .append('sortOrder', data.sortOrder)
      .append('searchData', data.searchData);
    return this.http.get<QuestionResponsePaginated>(
      `${BASE_URL}/api/questions/paginated`,
      { params }
    );
  }

  public addQuestion(data: MapObject): Observable<AddQuestionResponse> {
    return this.http.post<AddQuestionResponse>(
      `${BASE_URL}/api/questions`,
      data
    );
  }

  public editQuestion(data: MapObject): Observable<AddQuestionResponse> {
    return this.http.put<AddQuestionResponse>(
      `${BASE_URL}/api/questions/`,
      data
    );
  }

  public deleteQuestion(id: number): Observable<DeleteQuestionResponse> {
    return this.http.delete<DeleteQuestionResponse>(
      `${BASE_URL}/api/questions/${id}`
    );
  }

  public getQuestionById(id: number): Observable<GetQuestionResponse> {
    return this.http.get<GetQuestionResponse>(
      `${BASE_URL}/api/questions/${id}`
    );
  }

  public getAnswerByQuestionId(id: number): Observable<QuestionAnswerResponse> {
    return this.http.get<QuestionAnswerResponse>(
      `${BASE_URL}/api/questions/${id}/answer`
    );
  }
}
