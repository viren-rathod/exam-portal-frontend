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

export interface QuestionResponsePaginatedData extends BaseResponse {
  content: Array<Question>;
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

export interface QuestionResponsePaginated {
  data: QuestionResponsePaginated;
}

export interface AddQuestionResponse extends BaseResponse {
  data: Question;
}

export interface GetQuestionResponse extends BaseResponse {
  data: QuestionList;
}

export interface DeleteQuestionResponse extends BaseResponse {
  data: string;
}
