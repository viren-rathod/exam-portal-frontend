import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentExamService } from '../../shared/services/student-exam/student-exam.service';
import { StudentExamQuestion, ExamResult, ExamTiming } from '../../shared/models/api/student-exam.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit, OnDestroy {
  examId: number = 0;
  questions: StudentExamQuestion[] = [];
  currentIndex: number = 0;
  examTitle: string = '';
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  isFinished: boolean = false;
  errorMessage: string = '';

  // Timer
  remainingSeconds: number = 0;
  timerDisplay: string = '00:00:00';
  private timerSubscription?: Subscription;

  // Result
  examResult?: ExamResult;

  // Confirmation modal
  showFinishConfirm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private studentExamService: StudentExamService
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    this.loadExam();
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  // Block right-click context menu
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
  }

  // Block devtools shortcuts
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // F12
    if (event.key === 'F12') {
      event.preventDefault();
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) {
      event.preventDefault();
    }
    // Ctrl+U (view source)
    if (event.ctrlKey && event.key.toUpperCase() === 'U') {
      event.preventDefault();
    }
    // Cmd+Option+I (Mac)
    if (event.metaKey && event.altKey && event.key.toUpperCase() === 'I') {
      event.preventDefault();
    }
  }

  // Warn before closing
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.isFinished) {
      event.preventDefault();
      event.returnValue = 'Your exam is still in progress. Are you sure you want to leave?';
    }
  }

  loadExam(): void {
    this.isLoading = true;

    // Load questions (resume or start)
    this.studentExamService.getExamQuestions(this.examId).subscribe({
      next: (res) => {
        this.questions = res.data || [];
        this.loadTiming();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load exam questions.';
        this.isLoading = false;
      }
    });
  }

  loadTiming(): void {
    this.studentExamService.getTimingInfo(this.examId).subscribe({
      next: (res) => {
        const timing = res.data;
        this.examTitle = timing.examTitle;

        // Calculate remaining time based on server time
        const endTime = new Date(timing.examEndTime).getTime();
        const serverTime = new Date(timing.serverTime).getTime();
        this.remainingSeconds = Math.max(0, Math.floor((endTime - serverTime) / 1000));

        this.isLoading = false;
        this.startTimer();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load exam timing info.';
        this.isLoading = false;
      }
    });
  }

  startTimer(): void {
    this.updateTimerDisplay();
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateTimerDisplay();
      } else {
        // Auto-submit when timer reaches zero
        this.timerSubscription?.unsubscribe();
        this.autoFinishExam();
      }
    });
  }

  updateTimerDisplay(): void {
    const hours = Math.floor(this.remainingSeconds / 3600);
    const minutes = Math.floor((this.remainingSeconds % 3600) / 60);
    const seconds = this.remainingSeconds % 60;
    this.timerDisplay = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  get currentQuestion(): StudentExamQuestion | null {
    return this.questions[this.currentIndex] || null;
  }

  get answeredCount(): number {
    return this.questions.filter(q => q.selectedOptionId != null).length;
  }

  get unansweredCount(): number {
    return this.questions.length - this.answeredCount;
  }

  get timerClass(): string {
    if (this.remainingSeconds <= 60) return 'timer-danger';
    if (this.remainingSeconds <= 300) return 'timer-warning';
    return 'timer-normal';
  }

  selectOption(optionId: number): void {
    if (!this.currentQuestion || this.isFinished) return;

    const prevOptionId = this.currentQuestion.selectedOptionId;
    this.currentQuestion.selectedOptionId = optionId;

    this.studentExamService.submitAnswer({
      examQuestionId: this.currentQuestion.examQuestionId,
      selectedOptionId: optionId
    }).subscribe({
      error: (err) => {
        // Revert on failure
        this.currentQuestion!.selectedOptionId = prevOptionId;
        console.error('Failed to submit answer:', err);
      }
    });
  }

  clearAnswer(): void {
    if (!this.currentQuestion || this.isFinished) return;

    const prevOptionId = this.currentQuestion.selectedOptionId;
    this.currentQuestion.selectedOptionId = null;

    this.studentExamService.submitAnswer({
      examQuestionId: this.currentQuestion.examQuestionId,
      selectedOptionId: null
    }).subscribe({
      error: (err) => {
        this.currentQuestion!.selectedOptionId = prevOptionId;
        console.error('Failed to clear answer:', err);
      }
    });
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  confirmFinish(): void {
    this.showFinishConfirm = true;
  }

  cancelFinish(): void {
    this.showFinishConfirm = false;
  }

  finishExam(): void {
    this.showFinishConfirm = false;
    this.isSubmitting = true;

    this.studentExamService.finishExam(this.examId).subscribe({
      next: (res) => {
        this.examResult = res.data;
        this.isFinished = true;
        this.isSubmitting = false;
        this.timerSubscription?.unsubscribe();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to submit exam.';
        this.isSubmitting = false;
      }
    });
  }

  autoFinishExam(): void {
    this.isSubmitting = true;
    this.studentExamService.finishExam(this.examId).subscribe({
      next: (res) => {
        this.examResult = res.data;
        this.isFinished = true;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Time expired. Failed to auto-submit exam.';
        this.isSubmitting = false;
      }
    });
  }

  closeWindow(): void {
    window.close();
  }
}
