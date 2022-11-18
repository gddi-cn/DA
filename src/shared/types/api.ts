export interface APIResponse<T> {
  success: boolean;
  data?: T
}

export interface APIListResponse<T> {
  success: boolean;
  data?: {
    items: T[];
    total: number;
  };
}

export interface APIListParams {
  page_size: number;
  page: number;
}
