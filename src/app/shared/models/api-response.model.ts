export interface ApiResponse<T> {
    status?: any;
    message?: any;
    data?: T;
    content?: T;
    error?: any;
}
