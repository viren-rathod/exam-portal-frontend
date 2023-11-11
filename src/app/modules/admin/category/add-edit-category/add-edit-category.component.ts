import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Category } from 'src/app/shared/models/api/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  editMode: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toast: NgToastService,
  ) { }

  get title() {
    return this.categoryForm.get('title');
  }
  get description() {
    return this.categoryForm.get('description');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(30), Validators.required]],
      description: ['', Validators.required],
    });
    this.checkEditMode();
  }

  /**
   * Submit the add/edit Category
   */
  onSubmit(): void {
    Object.keys(this.categoryForm.controls).forEach((key) => {
      this.categoryForm.get(key)?.markAsDirty();
      this.categoryForm.get(key)?.markAsTouched();
    });
    if (this.categoryForm.valid) {
      let addCategoryData: Category = {
        title: this.categoryForm.value.title,
        description: this.categoryForm.value.description,
      };
      console.log('addCategoryData()-->', { ...addCategoryData });
      if (this.editMode) {
        addCategoryData.id = +this.id;
        this.categoryService.editCategory(addCategoryData).subscribe({
          next: (res) => {
            console.log('Category Updated successfully...', res.data);
            this.toast.success({
              detail: 'Success',
              summary: 'Category Updated Successfully!',
              duration: 3000,
              position: 'topRight',
            });
            this.router.navigate(['exam-portal/admin/category']);
          },
          error: (error) => {
            console.log('Error updating Category!!', error.error.message);
            this.toast.error({
              detail: 'Failed!',
              summary: error.error,
              duration: 3000,
              position: 'topRight',
            });
          },
        });
      } else {
        this.categoryService.addCategory(addCategoryData).subscribe({
          next: (res) => {
            console.log('Category addes successfully...', res.data);
            this.toast.success({
              detail: 'Success',
              summary: 'Category Created Successfully!',
              duration: 3000,
              position: 'topRight',
            });
            this.router.navigate(['exam-portal/admin/category']);
          },
          error: (error) => {
            console.log('Error adding Category!!', error.error.message);
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
  }

  /**
   * Check if Category to be Save or Update using id in param
   */
  checkEditMode(): void {
    this.route.params.subscribe((params) => {
      if (params['id'] != null) {
        this.id = params['id'];
        this.editMode = true;
      }
    });
    if (this.editMode) {
      this.getCategory();
    }
  }

  /**
   * Get Category by id
   */
  getCategory(): void {
    this.categoryService.getCategoryById(this.id).subscribe({
      next: (res) => {
        const categoryDetails = res.data;
        let editForm = {
          title: categoryDetails.title,
          description: categoryDetails.description,
        };
        this.categoryForm.patchValue(editForm);
      },
      error: () => {
        this.toast.error({
          detail: 'Failed!',
          summary: 'Something went Wrong!!',
          duration: 3000,
          position: 'topRight',
        });
      },
    });
  }

  onCancel() {
    this.router.navigate(['exam-portal/admin/category']);
   }

}
