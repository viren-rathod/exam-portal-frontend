import { BaseResponse } from '../base-response.model';
import { Pageable, Sort } from '../common';

export interface Question {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
}
export interface QuestionList {
  id: number;
  title: string;
  description: string;
  categoryId: number;
}

export interface QuestionDataRequest {
  page: number;
  size: number;
  sortField: string;
  sortOrder: string;
  searchData: string;
  // filter?:Filter;
}

export interface QuestionResponse extends BaseResponse {
  data: Array<Question>;
}

export interface QuestionResponsePaginatedData {
  content: Array<QuestionList>;
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface QuestionResponsePaginated extends BaseResponse {
  data: QuestionResponsePaginatedData;
}

export interface AddQuestionResponse extends BaseResponse {
  data: QuestionList;
}

export interface GetQuestionResponse extends BaseResponse {
  data: QuestionList;
}

export interface DeleteQuestionResponse extends BaseResponse {
  data: string;
}

export interface SelectBox {
  key: number;
  value: string;
}
