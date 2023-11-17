import { Roles } from '../../enums/roles.enum';
import { Status } from '../../enums/status.enum';
import { BaseResponse } from '../base-response.model';

export interface Exam {
  id?: number;
  title: string;
  description: string;
  maxMarks: string;
  totalQuestions: string;
  examTime: number;
  status: Status;
  categories: number[];
}
export interface ExamList {
  id: number;
  title: string;
  description: string;
  maxMarks: string;
  totalQuestions: string;
  examTime: number;
  status: Status;
  categories: number[];
}
export interface ExamDataRequest {
  page: number;
  size: number;
  sortField: string;
  sortOrder: string;
  searchData: string;
  // filter?:Filter;
}

export interface ExamResponse extends BaseResponse {
  data: Array<ExamList>;
}
export interface PaginatedExamResponse extends BaseResponse {
  data: {
    content: Array<ExamList>;
  };
}
export interface AddExamResponse extends BaseResponse {
  data: Exam;
}
export interface GetExamResponse extends BaseResponse {
  data: Exam;
}
export interface DeleteExamResponse extends BaseResponse {
  data: string;
}
