import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {Status} from 'src/app/shared/enums/status.enum';
import {CategoryDataRequest, CategoryList,} from 'src/app/shared/models/api/category.model';
import {CategoryService} from 'src/app/shared/services/category/category.service';

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
  sort: number = 1;
  private searchSubject = new Subject<string>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
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
        } else if (data.page !== 0) {
          this.getCategory({
            page: 0,
            size: this.pageSize,
            sortField: 'id',
            sortOrder: 'asc',
            searchData: '',
          });
        } else {
          this.categoryList.length = 0;
          this.totalCategories = 0
          this.totalPages = 0;
          this.currentPage = 0;
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
    this.getCategoryData = {...this.getCategoryData, page: index};
    this.getCategory(this.getCategoryData);
  }

  /**
   * Handling Sorting on Each field
   * @param event
   */
  handleSort(event: Event) {
    let sortField: string = 'id';
    let sortOrder: string = 'asc';
    if (this.sort > 2) {
      this.sort = 1;
      sortField = 'id';
      sortOrder = 'asc';
    } else {
      this.sort += 1;
      sortField = (event.currentTarget as HTMLInputElement).id;
      sortOrder = this.sort == 2 ? 'dsc' : 'asc';
    }

    this.getCategoryData = {
      ...this.getCategoryData,
      sortField: sortField,
      sortOrder: sortOrder
    };
    this.getCategory(this.getCategoryData);
  }

  handleSizeChange(event: Event) {
    this.getCategoryData = {
      ...this.getCategoryData,
      size: +(event.target as HTMLInputElement).value,
      page: 0,
    };
    this.getCategory(this.getCategoryData);
  }

  /**
   * Handling Search with debounce
   * @param event
   */
  onSearch(event: Event) {
    let searchString = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchString);
  }

  /**
   * Performing search
   * @param str
   */
  searchHandler(str: string) {
    this.getCategoryData = {
      ...this.getCategoryData,
      searchData: str,
      page: 0,
    };
    this.getCategory(this.getCategoryData);
  }
}
