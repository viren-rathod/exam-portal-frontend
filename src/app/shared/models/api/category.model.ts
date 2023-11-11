import { BaseResponse } from "../base-response.model";
import { Pageable, Sort } from "../common";

export interface Category {
    id?: number;
    title: string;
    description: string;
}
export interface CategoryList {
    id: number;
    title: string;
    description: string;
}
export interface CategoryDataRequest {
    page: number;
    size: number;
}

export interface CategoryResponse extends BaseResponse {
    data: Array<Category>
}

export interface CategoryResponsePaginatedData {
    content: Array<CategoryList>;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean
    numberOfElements: number
    empty: boolean
}

export interface CategoryResponsePaginated extends BaseResponse {
    data: CategoryResponsePaginatedData
}

export interface AddCategoryResponse extends BaseResponse {
    data: Category;
}

export interface GetCategoryResponse extends BaseResponse {
    data: CategoryList;
}

export interface DeleteCategoryResponse extends BaseResponse {
    data: string;
}