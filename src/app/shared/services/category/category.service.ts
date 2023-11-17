import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddCategoryResponse,
  Category,
  CategoryDataRequest,
  CategoryResponse,
  CategoryResponsePaginated,
  DeleteCategoryResponse,
  GetCategoryResponse,
} from '../../models/api/category.model';
import { Observable } from 'rxjs';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  public getCategories(
    data: CategoryDataRequest
  ): Observable<CategoryResponsePaginated> {
    let params = new HttpParams()
      .append('page', data.page)
      .append('size', data.size)
      .append('sortField', data.sortField)
      .append('sortOrder', data.sortOrder)
      .append('searchData', data.searchData);
    return this.http.get<CategoryResponsePaginated>(
      `${BASE_URL}/api/category/paginated`,
      { params }
    );
  }

  public getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${BASE_URL}/api/category/`);
  }

  public addCategory(data: Category): Observable<AddCategoryResponse> {
    return this.http.post<AddCategoryResponse>(
      `${BASE_URL}/api/category`,
      data
    );
  }

  public editCategory(data: Category): Observable<AddCategoryResponse> {
    return this.http.put<AddCategoryResponse>(
      `${BASE_URL}/api/category/`,
      data
    );
  }

  public deleteCategory(id: number): Observable<DeleteCategoryResponse> {
    return this.http.delete<DeleteCategoryResponse>(
      `${BASE_URL}/api/category/${id}`
    );
  }

  public getCategoryById(id: number): Observable<GetCategoryResponse> {
    return this.http.get<GetCategoryResponse>(`${BASE_URL}/api/category/${id}`);
  }
}
