import {Status} from '../../enums/status.enum';
import {BaseResponse} from '../base-response.model';

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
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    number: number;
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

export interface GetActiveExamsRequest {
  id?: number | null;
  page: number;
  perPage: number;
  sortField: string | null;
  sortOrder: string | null;
  status: string | null;
  searchData: string;
}

export interface ActiveExam {
  id: number;
  name: string;
  exam_time: number;
  total_question: number;
  exam_code?: string;
  candidates_count: number;
  candidate_status: string;
  candidate_id: number;
}

export interface ActiveExamResponse extends BaseResponse {
  data: {
    content: Array<ActiveExam>;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    number: number;
  };
}
