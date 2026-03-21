import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CandidateService } from '../../../shared/services/candidate/candidate.service';
import { CollegeService, CollegeItem } from '../../../shared/services/college/college.service';
import { LoginService } from '../../../shared/services/auth/login.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {
  @ViewChild('candidateModal') modal?: ModalComponent;
  @Input() examId: number = 0;
  @Output() formSubmitted = new EventEmitter<number>();

  candidateForm!: FormGroup;
  colleges: CollegeItem[] = [];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private collegeService: CollegeService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.candidateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      enrollmentNumber: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      collegeId: ['', Validators.required],
      sscPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      hscPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      cgpa: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });

    this.loadColleges();
  }

  loadColleges(): void {
    this.collegeService.getAllColleges().subscribe({
      next: (res) => {
        if (res.data) {
          this.colleges = res.data;
        }
      },
      error: (err) => console.error('Error loading colleges:', err)
    });
  }

  open(examId: number): void {
    this.examId = examId;
    this.candidateForm.reset();
    this.errorMessage = '';

    // Pre-fill email from logged-in user
    const user = this.loginService.getUserDetailsFromLocalStorage();
    if (user?.email) {
      this.candidateForm.patchValue({ email: user.email });
    }

    if (this.modal) {
      this.modal.open();
    }
  }

  onSubmitForm = (): void => {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const user = this.loginService.getUserDetailsFromLocalStorage();
    const payload = {
      ...this.candidateForm.value,
      examId: this.examId,
      username: user?.username,
      collegeId: +this.candidateForm.value.collegeId,
      sscPercentage: +this.candidateForm.value.sscPercentage,
      hscPercentage: +this.candidateForm.value.hscPercentage,
      cgpa: +this.candidateForm.value.cgpa
    };

    this.candidateService.addCandidate(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        if (this.modal) {
          this.modal.close();
        }
        this.formSubmitted.emit(this.examId);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to register. Please try again.';
      }
    });
  }
}
