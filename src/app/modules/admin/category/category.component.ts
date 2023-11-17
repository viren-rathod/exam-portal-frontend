import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Status } from 'src/app/shared/enums/status.enum';
import {
  CategoryDataRequest,
  CategoryList,
} from 'src/app/shared/models/api/category.model';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryList: CategoryList[] = [];
  totalCategories: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 3;
  sizeArray = [
    {
      value: 3,
      title: 3,
    },
    {
      value: 5,
      title: 5,
    },
    {
      value: 10,
      title: 10,
    },
  ];
  getCategoryData: CategoryDataRequest = {
    page: this.currentPage,
    size: this.pageSize,
    sortField: 'id',
    sortOrder: 'asc',
    searchData: '',
  };
  StatusType = Status;
  private searchSubject = new Subject<string>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(3000), distinctUntilChanged())
      .subscribe((res) => this.searchHandler(res));
    this.getCategory(this.getCategoryData);
  }

  getCategory(data: CategoryDataRequest) {
    this.categoryService.getCategories(data).subscribe({
      next: (res) => {
        if (res) {
          this.categoryList = res.data.content;
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.number;
          this.totalCategories = res.data.totalElements;
        } else {
          this.categoryList = [];
          this.totalPages = 0;
        }
        console.log('categoryData() -->', this.categoryList);
      },
      error: (error) => console.log(error.error.message),
    });
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
      });
    }
  }

  onParamsChange(index: number): void {
    this.getCategoryData = { ...this.getCategoryData, page: index };
    this.getCategory(this.getCategoryData);
  }

  handleSizeChange(event: Event) {
    this.getCategoryData = {
      ...this.getCategoryData,
      size: +(event.target as HTMLInputElement).value,
    };
    this.getCategory(this.getCategoryData);
  }

  /**
   * Handling Search with debounce
   * @param event
   */
  onSearch(event: Event) {
    let saerchString = (event.target as HTMLInputElement).value;
    this.searchSubject.next(saerchString);
  }

  /**
   * Performing search
   * @param str
   */
  searchHandler(str: string) {
    this.getCategoryData = {
      ...this.getCategoryData,
      searchData: str,
    };
    this.getCategory(this.getCategoryData);
  }
}
