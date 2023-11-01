import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/api/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

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
  totalQuestion: number = 0;
  selectedCategoryCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
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
    /**
     * Get Category details
     */
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        console.log('getAllCategories-->', this.categoryList);
      },
      error: (error) => {
        console.log('ERROR-->', error);
      },
    });
    this.initForm();
  }
  initForm(): void {
    this.examForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      examTime: [, Validators.required],
      categories: [[], Validators.required],
      // categoryquestions: this.formBuilder.array([], Validators.required),
      totalQuestions: ['', [Validators.required, Validators.min(1)]],
      maxMarks: ['', Validators.required],
      description: '',
    });
  }

  onSubmit() {
    Object.keys(this.examForm.controls).forEach((key) => {
      this.examForm.get(key)?.markAsDirty();
      this.examForm.get(key)?.markAsTouched();
    });
    if(this.examForm.valid) {
      
    }
  }
}
