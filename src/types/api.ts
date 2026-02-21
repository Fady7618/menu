export interface ApiError {
  message: string;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}