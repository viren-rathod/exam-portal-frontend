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
export interface AddAllQuestionResponse extends BaseResponse {
  data: string;
}
