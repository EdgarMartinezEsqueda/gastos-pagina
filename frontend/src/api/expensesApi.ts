import type { ApiError, PaginatedResponse, QueryParams } from "@/types/api";
import type { CreateExpenseDto, Expense, UpdateExpenseDto } from "@/types/expense";
import axios, { type AxiosError, type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Interceptor de respuestas para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || "Error desconocido",
      statusCode: error.response?.status || 500,
      error: error.response?.data?.error,
    }
    return Promise.reject(apiError)
  }
)

// API de Gastos
export const expensesApi = {
  /**
   * Obtener todos los gastos con paginación y filtros
   */
  async getExpenses(params: QueryParams = {}): Promise<PaginatedResponse<Expense>> {
    const response = await apiClient.get<PaginatedResponse<Expense>>("/expenses", { params })
    return response.data
  },

  /**
   * Obtener un gasto por ID
   */
  async getExpenseById(id: number): Promise<Expense> {
    const response = await apiClient.get<Expense>(`/expenses/${id}`)
    return response.data
  },

  /**
   * Crear un nuevo gasto
   */
  async createExpense(data: CreateExpenseDto): Promise<Expense> {
    const response = await apiClient.post<Expense>("/expenses", data)
    return response.data
  },

  /**
   * Actualizar un gasto existente
   */
  async updateExpense(id: number, data: UpdateExpenseDto): Promise<Expense> {
    const response = await apiClient.put<Expense>(`/expenses/${id}`, data)
    return response.data
  },

  /**
   * Eliminar un gasto
   */
  async deleteExpense(id: number): Promise<void> {
    await apiClient.delete(`/expenses/${id}`)
  },
}

export default apiClient
