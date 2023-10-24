import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  totalQuestions: number = 0;
  selectedCategoryCount: number = 0;

  constructor(private categoryService: CategoryService) {}

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
  }
}
