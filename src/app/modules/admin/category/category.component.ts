import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/shared/enums/status.enum';
import { CategoryDataRequest, CategoryList, CategoryResponsePaginated, CategoryResponsePaginatedData } from 'src/app/shared/models/api/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // categoryData: CategoryResponsePaginatedData = {} as CategoryResponsePaginatedData;
  categoryList: CategoryList[] = [];
  getCategoryData: CategoryDataRequest = {
    page: 0,
    size: 10,
  };
  StatusType = Status;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory(this.getCategoryData);
  }

  getCategory(data: CategoryDataRequest) {
    this.categoryService.getCategories(data).subscribe({
      next: (res) => {
        this.categoryList = res.data.content;
        console.log("categoryData() -->", this.categoryList);
      },
      error: (error) => console.log(error.error.message),
    })
  }

  /**
   * Delete Exam
   * @param id
   */
  onDelete(id: number) {
    if (confirm('Are you sure')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (res) => {
          console.log(res);
          this.getCategory(this.getCategoryData);
        },
        error: (err) => console.log(err.error.message),
      })
    }
  }

}
