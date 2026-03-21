import { BaseResponse } from '../base-response.model';

export interface StudentExamQuestion {
  examQuestionId: number;
  questionId: number;
  title: string;
  description: string;
  options: StudentExamOption[];
  selectedOptionId: number | null;
}

export interface StudentExamOption {
  id: number;
  title: string;
}

export interface SubmitAnswer {
  examQuestionId: number;
  selectedOptionId: number | null;
}

export interface ExamResult {
  examId: number;
  examTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  totalMarks: number;
  scoredMarks: number;
}

export interface ExamTiming {
  examEndTime: string;
  serverTime: string;
  examTitle: string;
  examTimeMinutes: number;
}

export interface StudentExamQuestionsResponse extends BaseResponse {
  data: StudentExamQuestion[];
}

export interface SubmitAnswerResponse extends BaseResponse {
  data: StudentExamQuestion;
}

export interface ExamResultResponse extends BaseResponse {
  data: ExamResult;
}

export interface ExamTimingResponse extends BaseResponse {
  data: ExamTiming;
}
