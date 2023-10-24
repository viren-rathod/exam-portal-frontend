import { Roles } from '../../enums/roles.enum';
import { BaseResponse } from '../base-response.model';

export interface Exam {
  id: number;
  title: string;
  description: string;
  maxMarks: string;
  totalQuestions: string;
  status: Roles;
  examTime: number;
  examCode: number;
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
