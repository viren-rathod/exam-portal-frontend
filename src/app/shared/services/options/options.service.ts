import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddAllOptionsResponse,
  GetOptionsResponse,
  Option,
} from '../../models/api/option.model';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) { }

  public getOptionsByQuestionId(id: number): Observable<GetOptionsResponse> {
    return this.http.get<GetOptionsResponse>(
      `${BASE_URL}/api/option/question/${id}`
    );
  }

  public addAllOptions(data: Option[]): Observable<AddAllOptionsResponse> {
    return this.http.post<AddAllOptionsResponse>(
      `${BASE_URL}/api/option/addAll`,
      data
    );
  }

  public saveAnswer(data: Option): Observable<AddAllOptionsResponse> {
    return this.http.put<AddAllOptionsResponse>(
      `${BASE_URL}/api/option/saveAnswer`,
      data
    );
  }
  public deleteOption(id: number): Observable<AddAllOptionsResponse> {
    return this.http.delete<AddAllOptionsResponse>(`${BASE_URL}/api/option/${id}`);
  }
}
