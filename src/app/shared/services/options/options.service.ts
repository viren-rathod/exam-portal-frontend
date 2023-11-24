import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddAllQuestionResponse,
  GetOptionsResponse,
  OptionList,
} from '../../models/api/option.model';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}

  public getOptionsByQuestionId(id: number): Observable<GetOptionsResponse> {
    return this.http.get<GetOptionsResponse>(
      `${BASE_URL}/api/option/question/${id}`
    );
  }

  public addAllOptions(data: OptionList[]): Observable<AddAllQuestionResponse> {
    return this.http.post<AddAllQuestionResponse>(
      `${BASE_URL}/api/option/addAll`,
      data
    );
  }

  public saveAnswer(data: OptionList): Observable<AddAllQuestionResponse> {
    return this.http.put<AddAllQuestionResponse>(
      `${BASE_URL}/api/option/saveAnswer`,
      data
    );
  }
}
