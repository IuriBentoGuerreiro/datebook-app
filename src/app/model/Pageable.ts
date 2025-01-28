export interface Pageable<T> {
  page: number;
  size: number;
  totalElements: number;
  content: T[];
}
