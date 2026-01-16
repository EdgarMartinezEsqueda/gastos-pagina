export enum ExpenseCategory {
  ALIMENTACION = "alimentacion",
  TRANSPORTE = "transporte",
  VIVIENDA = "vivienda",
  ENTRETENIMIENTO = "entretenimiento",
  SALUD = "salud",
  EDUCACION = "educacion",
  UTILIDADES = "utilidades",
  OTROS = "otros"
}

export interface Expense {
  id: number
  description: string
  amount: number
  date: string
  category: ExpenseCategory
  createdAt: string
  updatedAt: string
}

export interface CreateExpenseDto {
  description: string
  amount: number
  date: string
  category: ExpenseCategory
}

export interface UpdateExpenseDto {
  description?: string
  amount?: number
  date?: string
  category?: ExpenseCategory
}

export interface ExpenseFormData {
  description: string
  amount: string
  date: string
  category: ExpenseCategory | ""
}

export interface ExpenseFormErrors {
  description?: string
  amount?: string
  date?: string
  category?: string
}
