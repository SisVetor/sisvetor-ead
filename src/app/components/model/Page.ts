export interface Page<T> {
    content: T[];
    totalElements: number;
    last: boolean;
    first: true;
    totalPages: number;
    length: number;
}