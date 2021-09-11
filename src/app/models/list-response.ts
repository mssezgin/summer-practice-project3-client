export interface ListResponse<T> {
    totalSize: number;
    totalPages: number;
    pageSize: number;
    page: number;
    result: T[];
}
