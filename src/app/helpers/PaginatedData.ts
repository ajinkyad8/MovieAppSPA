export interface Pagination {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
}

export class PaginatedData<T> {
    data: T;
    pagination: Pagination;
}