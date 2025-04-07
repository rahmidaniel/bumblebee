// Define API response types
export interface ApiResponse<T> {
  data: T
  status: string
  message: string
}
