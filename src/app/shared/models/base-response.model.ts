import { Status } from "../enums/status.enum";

export interface BaseResponse {
    message: string;
    response_code: number;
    status: Status;
    toast: boolean;
    length: number
    empty: boolean
}