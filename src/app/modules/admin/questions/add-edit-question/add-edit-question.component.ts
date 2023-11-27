import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Option, OptionList } from 'src/app/shared/models/api/option.model';
import { Question, SelectBox } from 'src/app/shared/models/api/question.model';
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
      answer: [],
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
    if (this.questionForm.valid) {
      let data = this.questionForm.value;
      let questionData: Question = {
        id: undefined,
        title: data.question,
        description: data.description,
        categoryId: data.categories
      }
      let questionId: number;
      let allOptions: Option[] = [];
      //Save the question
      this.questionsService.addQuestion(questionData).subscribe({
        next: (res) => {
          questionId = res.data.questionDto.id;
          // save the options
          for (let i = 0; i < data.options.length; i++) {
            let optionIdIndex: number;
            let newOptionId: number | undefined = undefined;
            if (this.optionsTitleList.includes(data.options[i].option)) {
              optionIdIndex = this.optionsTitleList.indexOf(data.options[i].option);
              newOptionId = this.optionsIdList[optionIdIndex];
            } else {
              newOptionId = undefined
            }
            if (this.editMode) {
              allOptions.push({
                id: newOptionId,
                title: data.options[i].option.trim(),
                questionId: questionId
              });
            } else {
              allOptions.push({
                title: data.options[i].option.trim(),
                questionId: questionId
              });
            }
          }
          this.optionService.addAllOptions(allOptions).subscribe({
            next: (res) => {
              // console.log(res);
            },
            error: (error) => console.log(error.error.message)
          });
          // save the answer
          let selectedItem: SelectBox = { key: 0, value: '' };
          this.optionList.forEach(item => {
            if (item.key == +data.answer) {
              selectedItem = item
            }
          })
          let answer: OptionList = {
            id: selectedItem.key,
            title: selectedItem.value,
            questionId: questionId
          }
          console.log("answer", answer);
          this.optionService.saveAnswer(answer).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (error) => console.log(error.error.message)
          })
        },
        error: (error) => console.log(error.error.message)
      });
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
      option: [defaultValue],
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
      // answer: '',
      // options: [{}]
    }
    //Get question
    this.questionsService.getQuestionById(this.id).subscribe({
      next: (res) => {
        // editForm.categories = res.data.categoryId;
        // editForm.question = res.data.description;
        editForm.status = res.status === 'ACTIVE' ? 'active' : 'inactive';
        // editForm.description = res.data.title;
        this.questionForm.controls['categories'].setValue(editForm.categories);
      },
      error: (error) => console.log(error.error.message)
    });

    //Get answer of question
    this.questionsService.getAnswerByQuestionId(this.id).subscribe({
      next: (res) => {
        // editForm.answer = res.data.title;
        // this.questionForm.controls['answer'].setValue(editForm.answer);
      },
      error: (error) => console.log(error.error.message)
    });

    //Get options of question
    this.optionService.getOptionsByQuestionId(this.id).subscribe({
      next: (res) => {
        // editForm.options = res.data;
      },
      error: (error) => console.log(error.error.message)
    });
    console.log(editForm);
    this.questionForm.patchValue(editForm);
  }
}
