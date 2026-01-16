export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  statusCode: number
  error?: string
}

export interface QueryParams {
  page?: number
  limit?: number
  category?: string
  query?: string
}
