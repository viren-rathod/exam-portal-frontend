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

export interface ExamDataRequest {
  page: number;
  size: number;
  // sortField: string | null;
  // sortOrder: string | null;
  // searchData: string;
  // filter?:Filter;
}

export interface ExamResponse extends BaseResponse {
  data: Array<Exam>;
}
export interface AddExamResponse extends BaseResponse {
  data: Exam;
}
