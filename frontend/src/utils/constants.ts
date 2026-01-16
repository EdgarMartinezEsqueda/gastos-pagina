import { ExpenseCategory } from "@/types/expense"

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.ALIMENTACION]: "Alimentación",
  [ExpenseCategory.TRANSPORTE]: "Transporte",
  [ExpenseCategory.VIVIENDA]: "Vivienda",
  [ExpenseCategory.ENTRETENIMIENTO]: "Entretenimiento",
  [ExpenseCategory.SALUD]: "Salud",
  [ExpenseCategory.EDUCACION]: "Educación",
  [ExpenseCategory.UTILIDADES]: "Utilidades",
  [ExpenseCategory.OTROS]: "Otros",
}

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50]

export const DEBOUNCE_DELAY = 300

export const TOAST_DURATION = 3000
