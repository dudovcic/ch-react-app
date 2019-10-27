declare module company {
  export interface SearchResult<T> {
    total_results: number;
    active_count: number;
    inactive_count: number;
    items: T[];
  }
}
