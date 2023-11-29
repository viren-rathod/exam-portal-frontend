import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgToastService } from 'ng-angular-popup';
import { Option, OptionList } from 'src/app/shared/models/api/option.model';
import { MapObject, Question, SelectBox } from 'src/app/shared/models/api/question.model';
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
    private toast: NgToastService,
    private router: Router
  ) { }

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
    this.checkEditMode();
    this.questionForm = this.formBuilder.group({
      categories: ['', Validators.required],
      question: ['', Validators.required],
      status: ['', Validators.required],
      description: [''],
      answer: [, Validators.required],
      options: this.formBuilder.array([]),
    });
    this.addFirstOption();
    this.getControls();
    this.getCategories();
  }

  onSubmit() {
    Object.keys(this.questionForm.controls).forEach((key) => {
      this.questionForm.get(key)?.markAsDirty();
      this.questionForm.get(key)?.markAsTouched();
    });
    //submit the data
    if (this.questionForm.valid) {
      let data = this.questionForm.value;
      let questionId: number;
      let allOptions: Option[] = [];
      //create options list
      for (let i = 0; i < data.options.length; i++) {
        let optionIdIndex: number;
        let newOptionId: number | undefined = undefined;
        if (this.optionsTitleList.includes(data.options[i].option)) {
          optionIdIndex = this.optionsTitleList.indexOf(data.options[i].option);
          newOptionId = this.optionsIdList[optionIdIndex];
        }
        if (this.editMode) {
          allOptions.push({
            id: newOptionId,
            title: data.options[i].option.trim(),
            questionId: questionId!
          });
        } else {
          allOptions.push({
            title: data.options[i].option.trim(),
            questionId: questionId!
          });
        }
      }
      //create question object
      let questionData: Question = {
        id: this.editMode ? this.id : undefined,
        title: data.question,
        description: data.description,
        categoryId: data.categories
      }
      let addEditQuestionData: MapObject = {
        t: questionData,
        k: allOptions
      }
      //Save the question with options
      if (!this.editMode) {
        this.questionsService.addQuestion(addEditQuestionData).subscribe({
          next: (res) => {
            //save the answer for this question
            questionId = res.data.t.id!;
            let savedOptions = res.data.k;
            let answerOption = savedOptions.find(option => option.title === data.options[parseInt(data.answer) - 1].option);
            this.optionService.saveAnswer({ id: answerOption?.id!, questionId: questionId, title: answerOption?.title! }).subscribe({
              next: (res) => {
                this.toast.success({
                  detail: 'Success',
                  summary: 'Question added Successfully!',
                  duration: 3000,
                  position: 'topRight',
                });
              },
              error: (error) => console.log(error.error.message)
            });
            this.router.navigate(['exam-portal/admin/questions']);
          },
          error: (error) => console.log(error.error.message)
        });
      }
      //Update the question with options
      else {
        let idsToDelete = this.optionsIdList.filter(id => !allOptions.some(option => option.id === id));
        this.questionsService.editQuestion(addEditQuestionData).subscribe({
          next: (res) => {
            //save the answer for this question
            questionId = res.data.t.id!;
            let savedOptions = res.data.k;
            let answerOption = savedOptions.find(option => option.title === data.options[parseInt(data.answer) - 1].option);
            this.optionService.saveAnswer({ id: answerOption?.id!, questionId: questionId, title: answerOption?.title! }).subscribe({
              next: (res) => {
                this.toast.success({
                  detail: 'Success',
                  summary: 'Question updated Successfully!',
                  duration: 3000,
                  position: 'topRight',
                });
              },
              error: (error) => console.log(error.error.message)
            });
            //Delete remaining Options
            idsToDelete.forEach(id => this.optionService.deleteOption(id).subscribe());
            this.router.navigate(['exam-portal/admin/questions']);
          },
          error: (error) => console.log(error.error.message)
        });
      }
    }
  }

  onCancel() {
    this.router.navigate(['exam-portal/admin/questions']);
  }

  addFirstOption() {
    if (!this.editMode) {
      if (this.options.controls.length > 0) {
        for (let i = this.options.controls.length - 1; i >= 0; i--) {
          this.removeField(i);
        }
      }
      (this.questionForm.get('answer') as FormControl).addValidators(Validators.required);
      this.addOptionsContent();
    }
  }

  addOptionsContent(defaultValue = ''): void {
    this.options.push(this.createOption(defaultValue));
    this.getControls();
  }

  createOption(defaultValue: string = '') {
    return this.formBuilder.group({
      option: [defaultValue, (formControl: FormControl) => (formControl.value).trim().length === 0 ? { isValid: true } : null],
    })
  }

  removeField(id: number, optionTitle: string = ''): void {
    if (this.questionForm.value.answer == +id + 1) {
      this.questionForm.controls['answer'].setValue('');
    } else if (this.questionForm.value.answer > +id + 1) {
      this.questionForm.controls['answer'].setValue(+this.questionForm.value.answer - 1)
    }
    if (this.optionsTitleList.includes(optionTitle)) {
      let optionIdIndex = this.optionsTitleList.indexOf(optionTitle);
      this.optionsTitleList.splice(optionIdIndex, 1);
      this.optionsIdList.splice(optionIdIndex, 1);
    }
    this.options.removeAt(id);
    this.getControls();
  }

  get checkValidity() {
    return this.options.invalid;
  }

  getControls(): void {
    this.optionList.splice(0, this.optionList.length);
    for (let i = 0; i < this.options.length; i++) {
      this.optionList.push({ key: i + 1, value: `Option ${i + 1}` });
    }
  }

  checkEditMode(): void {
    this.route.params.subscribe(
      (params) => {
        if (params['id'] != null) {
          this.id = params['id'];
          this.editMode = true;
        }
      }
    );
    if (this.editMode) {
      this.getQuestionAndOptions();
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

  getQuestionAndOptions(): void {
    let editForm = {
      categories: 0,
      question: '',
      status: '',
      description: '',
      answer: '',
      options: {}
    }
    //Get question
    this.questionsService.getQuestionById(this.id).subscribe({
      next: (res) => {
        const questionData = res.data.t;
        const optionsData = res.data.k;
        let selectedAnswer: number;
        optionsData.forEach(option => {
          this.optionsTitleList.push(option.title);
          this.optionsIdList.push(option.id!);
          this.addOptionsContent(option.title);
        });
        this.questionsService.getAnswerByQuestionId(this.id).subscribe({
          next: (res) => {
            let answerData = this.optionsIdList.find(id => id === res.data.id);
            selectedAnswer = this.optionsIdList.indexOf(answerData!);
            this.questionForm.controls['answer'].setValue(selectedAnswer + 1);
          },
          error: (error) => console.log(error.error.message)
        });
        editForm = {
          ...editForm,
          categories: questionData.categoryId,
          description: questionData.description,
          question: questionData.title,
          status: 'active',
          options: optionsData,
        };
        this.questionForm.patchValue(editForm);
      },
      error: (error) => console.log(error.error.message)
    });
  }
}
/*
{  "data": {
    "t": {
      "id": 6,
      "title": "<p>Speaking structurally we can say that <strong>A extends B</strong> is a lot like ‘<strong>A is a superset of B</strong>’, or, to be more verbose, ‘<strong>A has all of B</strong>’s properties, and maybe some more’.</p>",
      "description": "this is new question for Data Structures and Algorithms...",
      "categoryId": 1,
      "created_at": "2023-11-28T06:35:30.493+00:00",
      "created_by": "admin@mail.com"
    },
    "k": [
      {
        "id": 14,
        "title": "Error: cannot implement",
        "questionId": 6,
        "created_at": "2023-11-28T06:35:30.710+00:00",
        "created_by": "admin@mail.com"
      }
    ]
  },
}
*/