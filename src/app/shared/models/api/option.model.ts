import { BaseResponse } from '../base-response.model';

export interface Option {
  id?: number;
  title: string;
  questionId: number;
}
export interface OptionList {
  id: number;
  title: string;
  questionId: number;
}

export interface QuestionAnswerResponse extends BaseResponse {
  data: Option;
}
export interface GetOptionsResponse extends BaseResponse {
  data: Option[];
}
export interface AddAllOptionsResponse extends BaseResponse {
  data: string;
}

export interface QuestionAndOptions {
  question: string;
  options: Option[];
  answer: string;
  category: string;
  description: string;
  created_by?: string;
  created_at?: string
}
