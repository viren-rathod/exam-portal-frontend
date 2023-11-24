import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SelectBox } from 'src/app/shared/models/api/question.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OptionsService } from 'src/app/shared/services/options/options.service';
import { QuestionService } from 'src/app/shared/services/question/question.service';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.css'],
})
export class AddEditQuestionComponent implements OnInit {
  categoryList: SelectBox[] = [];
  editMode: boolean = false;
  id: number = 0;
  optionsTitleList: string[] = [];
  optionsIdList: number[] = [];
  optionList: SelectBox[] = [];
  questionForm!: FormGroup;
  dropDownClose: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private questionsService: QuestionService,
    private categoryService: CategoryService,
    private optionService: OptionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public Editor = ClassicEditor;

  get categories() {
    return this.questionForm.get('categories');
  }
  get options() {
    return this.questionForm.get('options') as FormArray;
  }
  get question() {
    return this.questionForm.get('question');
  }
  get status() {
    return this.questionForm.get('status');
  }
  get answer() {
    return this.questionForm.get('answer');
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    // this.checkEditMode();
    this.questionForm = this.formBuilder.group({
      categories: ['', Validators.required],
      question: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      answer: ['', Validators.required],
      options: this.formBuilder.array([]),
    });
    this.getControls();
    this.getCategories();
  }

  onSubmit() {
    Object.keys(this.questionForm.controls).forEach((key) => {
      this.questionForm.get(key)?.markAsDirty();
      this.questionForm.get(key)?.markAsTouched();
    });
    if (this.questionForm.valid) {
      console.log(this.questionForm.value);
    }
  }

  onCancel() {
    this.router.navigate(['exam-portal/admin/questions']);
  }

  getControls(): void {
    this.optionList.splice(0, this.optionList.length);
    for (let i = 0; i < this.options.length; i++) {
      this.optionList.push({ key: i + 1, value: `Option ${i + 1}` });
    }
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        res.data.forEach((ele) => {
          this.categoryList.push({
            key: ele.id,
            value: ele.title,
          });
        });
      },
      error: (err) => console.log('Error==>', err.error.message),
    });
  }
}
