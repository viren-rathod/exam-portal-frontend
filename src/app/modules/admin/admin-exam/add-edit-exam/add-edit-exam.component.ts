import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Status } from 'src/app/shared/enums/status.enum';
import { Category } from 'src/app/shared/models/api/category.model';
import { Exam } from 'src/app/shared/models/api/exam.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ExamService } from 'src/app/shared/services/exam/exam.service';

@Component({
  selector: 'app-add-edit-exam',
  templateUrl: './add-edit-exam.component.html',
  styleUrls: ['./add-edit-exam.component.css'],
})
export class AddEditExamComponent implements OnInit {
  categoryList: Array<Category> = [];
  examForm!: FormGroup;
  editMode: boolean = false;
  id: number = 0;
  selectedCategory: number[] = [];
  selectedCategoryCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private categoryService: CategoryService,
    private toast: NgToastService,
    private router: Router
  ) {}

  get title() {
    return this.examForm.get('title');
  }
  get examTime() {
    return this.examForm.get('examTime');
  }
  get categories() {
    return this.examForm.get('categories');
  }
  get totalQuestions() {
    return this.examForm.get('totalQuestions');
  }
  get maxMarks() {
    return this.examForm.get('maxMarks');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.examForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      examTime: [, Validators.required],
      categories: [[], Validators.required],
      totalQuestions: ['', [Validators.required, Validators.min(1)]],
      maxMarks: ['', Validators.required],
      description: '',
    });
    this.getQuestionCategories();
  }

  /**
   * Submit the add/edit exam
   */
  onSubmit(): void {
    Object.keys(this.examForm.controls).forEach((key) => {
      this.examForm.get(key)?.markAsDirty();
      this.examForm.get(key)?.markAsTouched();
    });
    if (this.examForm.valid) {
      let addExamData: Exam = {
        title: this.examForm.value.title,
        description: this.examForm.value.description,
        maxMarks: this.examForm.value.maxMarks,
        totalQuestions: this.examForm.value.totalQuestions,
        examTime: this.examForm.value.examTime,
        categories: this.selectedCategory,
        status: Status.InActive,
      };
      console.log('addExamData()-->', { ...addExamData });
      this.examService.addExam(addExamData).subscribe({
        next: (res) => {
          console.log('Exam addes successfully...', res.data);
          this.toast.success({
            detail: 'Success',
            summary: 'Exam Created Successfully!',
            duration: 3000,
            position: 'topRight',
          });
          this.router.navigate(['exam-portal/admin/exam']);
        },
        error: (error) => {
          console.log('Error adding Exam!!', error.error.message);
          this.toast.error({
            detail: 'Failed!',
            summary: error.error,
            duration: 3000,
            position: 'topRight',
          });
        },
      });
    }
  }

  /**
   * Navigate to exam list on cancel click
   */
  onCancel(): void {
    this.router.navigate(['exam-portal/admin/exam']);
  }

  /**
   * Adding selected Category
   */
  handleCategoryChange(event: number[]): void {
    this.selectedCategoryCount = event.length;
    if (event.length > this.selectedCategory.length) {
      event.filter((ele) => {
        if (!this.selectedCategory.includes(ele)) {
          this.selectedCategory.push(ele);
        }
      });
    } else {
      this.selectedCategory.filter((ele, i) => {
        if (!event.includes(ele)) {
          this.selectedCategory.forEach((value, i) => {
            if (ele === value) {
              this.selectedCategory.splice(i, 1);
            }
          });
        }
      });
    }
    console.log('Selected Categories : ', this.selectedCategory);
  }

  /**
   * Get Category details
   */
  getQuestionCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        console.log('getAllCategories-->', this.categoryList);
      },
      error: (error) => {
        console.log('ERROR-->', error);
      },
    });
  }
}
