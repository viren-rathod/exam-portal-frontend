import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ExamResultResponse,
  ExamTimingResponse,
  StudentExamQuestionsResponse,
  SubmitAnswer,
  SubmitAnswerResponse
} from '../../models/api/student-exam.model';
import BASE_URL from '../util';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {

  private readonly baseUrl = `${BASE_URL}/api/student/exam`;

  constructor(private http: HttpClient) {}

  /**
   * Start an exam — generates random questions for the student
   */
  public startExam(examId: number): Observable<StudentExamQuestionsResponse> {
    return this.http.post<StudentExamQuestionsResponse>(`${this.baseUrl}/${examId}/start`, {});
  }

  /**
   * Get assigned questions (resume an in-progress exam)
   */
  public getExamQuestions(examId: number): Observable<StudentExamQuestionsResponse> {
    return this.http.get<StudentExamQuestionsResponse>(`${this.baseUrl}/${examId}/questions`);
  }

  /**
   * Submit an answer for a single question
   */
  public submitAnswer(dto: SubmitAnswer): Observable<SubmitAnswerResponse> {
    return this.http.post<SubmitAnswerResponse>(`${this.baseUrl}/answer`, dto);
  }

  /**
   * Finish exam — evaluates all answers and returns result
   */
  public finishExam(examId: number): Observable<ExamResultResponse> {
    return this.http.post<ExamResultResponse>(`${this.baseUrl}/${examId}/finish`, {});
  }

  /**
   * Get exam timing info for countdown timer
   */
  public getTimingInfo(examId: number): Observable<ExamTimingResponse> {
    return this.http.get<ExamTimingResponse>(`${this.baseUrl}/${examId}/time-remaining`);
  }

  /**
   * Get result for a completed exam
   */
  public getExamResult(examId: number): Observable<ExamResultResponse> {
    return this.http.get<ExamResultResponse>(`${this.baseUrl}/${examId}/result`);
  }
}
