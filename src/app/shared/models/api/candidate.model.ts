import { BaseResponse } from "../base-response.model";
import { Pageable, Sort } from "../common";


export interface Candidate {
    username: string,
    examId: number,
    email: string,
    collegeId: number,
    enrollmentNumber: string,
    contactNumber: string,
    sscPercentage: number,
    hscPercentage: number,
    cgpa: number
}

export interface CandidateDataRequest {
    page: number;
    size: number;
}

export interface CandidateResponse extends BaseResponse {
    data: Array<Candidate>
}

export interface CandidateResponsePaginated extends BaseResponse {
    data: {
        content: Array<Candidate>;
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