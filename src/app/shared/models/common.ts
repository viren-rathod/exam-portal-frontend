export type Sort = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export type Pageable = {
    sort: Sort;
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
}