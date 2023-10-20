import { BaseResponse } from "../base-response.model";
import { Pageable, Sort } from "../common";

export interface Question {
    id: number
    title: string,
    description: string,
    categoryId: number
}

export interface QuestionDataRequest {
    page: number;
    size: number;
}

export interface QuestionResponse extends BaseResponse {
    data: Array<Question>
}

export interface QuestionResponsePaginated extends BaseResponse {
    data: {
        content: Array<Question>;
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
    };
}
