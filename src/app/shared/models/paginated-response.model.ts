export interface Pagination {
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
}
export interface PaginatedResponse<T> extends Pagination {
  content?: T[];
}

interface Sort {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

interface Pageable {
  offset?: number;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  sort?: Sort;
  unpaged?: boolean;
}
