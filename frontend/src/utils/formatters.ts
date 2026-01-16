import { ExpenseCategory } from "@/types/expense"

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function formatDateForInput(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function formatCategory(category: ExpenseCategory): string {
  const categoryLabels: Record<ExpenseCategory, string> = {
    [ExpenseCategory.ALIMENTACION]: "Alimentación",
    [ExpenseCategory.TRANSPORTE]: "Transporte",
    [ExpenseCategory.VIVIENDA]: "Vivienda",
    [ExpenseCategory.ENTRETENIMIENTO]: "Entretenimiento",
    [ExpenseCategory.SALUD]: "Salud",
    [ExpenseCategory.EDUCACION]: "Educación",
    [ExpenseCategory.UTILIDADES]: "Utilidades",
    [ExpenseCategory.OTROS]: "Otros",
  }
  return categoryLabels[category] || category
}
