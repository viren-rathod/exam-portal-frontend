import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import BASE_URL from '../../../../shared/services/util';

interface ExamCandidate {
  candidateId: number;
  username: string;
  email: string;
  enrollmentNumber: string;
  contactNumber: string;
  collegeName: string;
  status: string;
  score: number | null;
  totalQuestions: number | null;
  examStartTime: string | null;
  examEndTime: string | null;
}

@Component({
  selector: 'app-exam-candidates',
  templateUrl: './exam-candidates.component.html',
  styleUrls: ['./exam-candidates.component.css']
})
export class ExamCandidatesComponent implements OnInit {
  examId: number = 0;
  candidates: ExamCandidate[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCandidates();
  }

  loadCandidates(): void {
    this.isLoading = true;
    this.http.get<any>(`${BASE_URL}/api/exam/${this.examId}/candidates`).subscribe({
      next: (res) => {
        this.candidates = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 204) {
          this.candidates = [];
        } else {
          this.errorMessage = err.error?.message || 'Failed to load candidates.';
        }
        this.isLoading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'ATTENDED': return 'badge bg-success';
      case 'ATTENDING': return 'badge bg-warning text-dark';
      case 'NOT_ATTENDED': return 'badge bg-secondary';
      default: return 'badge bg-light text-dark';
    }
  }

  getScoreDisplay(candidate: ExamCandidate): string {
    if (candidate.status !== 'ATTENDED' || candidate.score == null) {
      return '-';
    }
    return `${candidate.score} / ${candidate.totalQuestions}`;
  }

  getPercentage(candidate: ExamCandidate): string {
    if (candidate.status !== 'ATTENDED' || candidate.score == null || candidate.totalQuestions == null || candidate.totalQuestions === 0) {
      return '-';
    }
    const pct = (candidate.score / candidate.totalQuestions) * 100;
    return pct.toFixed(0) + '%';
  }

  goBack(): void {
    this.router.navigate(['/exam-portal/dashboard']);
  }
}
