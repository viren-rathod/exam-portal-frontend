import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDataRequest, CategoryResponse, CategoryResponsePaginated } from '../../models/api/category.model';
import { Observable } from 'rxjs';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories(data: CategoryDataRequest): Observable<CategoryResponsePaginated> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size);
    return this.http.get<CategoryResponsePaginated>(`${BASE_URL}/api/category/paginated`, { params });
  }

  public getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${BASE_URL}/api/category/`);
  }

}
