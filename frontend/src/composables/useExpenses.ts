import { expensesApi } from "@/api/expensesApi"
import type { ApiError, QueryParams } from "@/types/api"
import type { CreateExpenseDto, Expense, UpdateExpenseDto } from "@/types/expense"
import { ref } from "vue"
import { useToast } from "./useToast"

export function useExpenses() {
  const expenses = ref<Expense[]>([])
  const currentExpense = ref<Expense | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalItems = ref(0)
  const totalPages = ref(0)

  const { showSuccess, showError } = useToast()

  /**
   * Obtener lista de gastos con filtros y paginación
   */
  const fetchExpenses = async (params: QueryParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await expensesApi.getExpenses(params)
      expenses.value = response.data
      totalItems.value = response.meta.total
      totalPages.value = response.meta.totalPages
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      showError(`Error al cargar gastos: ${apiError.message}`)
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener un gasto por ID
   */
  const fetchExpenseById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      currentExpense.value = await expensesApi.getExpenseById(id)
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      showError(`Error al cargar gasto: ${apiError.message}`)
    } finally {
      loading.value = false
    }
  }

  /**
   * Crear un nuevo gasto
   */
  const createExpense = async (data: CreateExpenseDto): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const newExpense = await expensesApi.createExpense(data)
      expenses.value.unshift(newExpense)
      showSuccess("Gasto creado correctamente")
      return true
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      showError(`Error al crear gasto: ${apiError.message}`)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualizar un gasto existente
   */
  const updateExpense = async (id: number, data: UpdateExpenseDto): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const updatedExpense = await expensesApi.updateExpense(id, data)
      const index = expenses.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      showSuccess("Gasto actualizado correctamente")
      return true
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      showError(`Error al actualizar gasto: ${apiError.message}`)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Eliminar un gasto
   */
  const deleteExpense = async (id: number): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await expensesApi.deleteExpense(id)
      expenses.value = expenses.value.filter((e) => e.id !== id)
      showSuccess("Gasto eliminado correctamente")
      return true
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      showError(`Error al eliminar gasto: ${apiError.message}`)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    expenses,
    currentExpense,
    loading,
    error,
    totalItems,
    totalPages,
    fetchExpenses,
    fetchExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
  }
}
