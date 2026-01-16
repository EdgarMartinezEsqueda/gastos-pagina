import { ExpenseCategory } from "@/types/expense"
import { z } from "zod"

export const descriptionSchema = z
  .string()
  .min(3, "La descripción debe tener al menos 3 caracteres")
  .max(255, "La descripción no puede exceder 255 caracteres")

export const amountSchema = z
  .number({
    required_error: "El monto es requerido",
    invalid_type_error: "El monto debe ser un número",
  })
  .positive("El monto debe ser mayor a 0")
  .refine(
    (val) => {
      const decimals = val.toString().split(".")[1]
      return !decimals || decimals.length <= 2
    },
    { message: "El monto no puede tener más de 2 decimales" }
  )

export const dateSchema = z.string().refine(
  (val) => {
    const date = new Date(val)
    return !isNaN(date.getTime())
  },
  { message: "Fecha inválida" }
)

export const categorySchema = z.nativeEnum(ExpenseCategory, {
  errorMap: () => ({ message: "Categoría inválida" }),
})

export const expenseFormSchema = z.object({
  description: descriptionSchema,
  amount: amountSchema,
  date: dateSchema,
  category: categorySchema,
})

export type ExpenseFormSchema = z.infer<typeof expenseFormSchema>

// Helper para validar un campo individual
export function validateField(field: string, value: any): string | undefined {
  try {
    switch (field) {
      case "description":
        descriptionSchema.parse(value)
        break
      case "amount":
        amountSchema.parse(value)
        break
      case "date":
        dateSchema.parse(value)
        break
      case "category":
        categorySchema.parse(value)
        break
    }
    return undefined
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message
    }
    return "Error de validación"
  }
}

// Helper para validar el formulario completo
export function validateExpenseForm(data: any): {
  success: boolean
  errors?: Record<string, string>
} {
  try {
    expenseFormSchema.parse(data)
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path[0]
        if (path) {
          errors[path.toString()] = err.message
        }
      })
      return { success: false, errors }
    }
    return { success: false, errors: { general: "Error de validación" } }
  }
}
