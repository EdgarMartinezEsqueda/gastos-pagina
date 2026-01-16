import type { ExpenseFormData, ExpenseFormErrors } from "@/types/expense"
import { validateField as validateFieldFn } from "@/utils/validators"
import { reactive, ref } from "vue"

export function useForm(initialData?: Partial<ExpenseFormData>) {
  const formData = reactive<ExpenseFormData>({
    description: initialData?.description || "",
    amount: initialData?.amount || "",
    date: initialData?.date || "",
    category: initialData?.category || "",
  })

  const errors = reactive<ExpenseFormErrors>({})
  const touchedFields = reactive<Record<string, boolean>>({})
  const isValidating = ref(false)

  let debounceTimeouts: Record<string, ReturnType<typeof setTimeout>> = {}

  const validateField = (field: keyof ExpenseFormData, immediate = false) => {
    touchedFields[field] = true

    const validate = () => {
      const value = formData[field]

      // Convertir amount de string a number para validación
      const valueToValidate =
        field === "amount" && value !== "" ? parseFloat(value as string) : value

      const error = validateFieldFn(field, valueToValidate)
      errors[field] = error
    }

    if (immediate) {
      validate()
    } else {
      // Debounce validation
      if (debounceTimeouts[field]) {
        clearTimeout(debounceTimeouts[field])
      }

      debounceTimeouts[field] = setTimeout(() => {
        validate()
      }, 300)
    }
  }

  const validateAllFields = (): boolean => {
    const fields: Array<keyof ExpenseFormData> = ["description", "amount", "date", "category"]
    
    fields.forEach((field) => {
      validateField(field, true)
    })

    return !Object.values(errors).some((error) => error !== undefined && error !== "")
  }

  const setFieldValue = (field: keyof ExpenseFormData, value: any) => {
    formData[field] = value
    if (touchedFields[field]) {
      validateField(field)
    }
  }

  const resetForm = (newData?: Partial<ExpenseFormData>) => {
    formData.description = newData?.description || ""
    formData.amount = newData?.amount || ""
    formData.date = newData?.date || ""
    formData.category = newData?.category || ""

    Object.keys(errors).forEach((key) => {
      delete errors[key as keyof ExpenseFormErrors]
    })

    Object.keys(touchedFields).forEach((key) => {
      touchedFields[key] = false
    })
  }

  const getFormattedData = () => {
    return {
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
    }
  }

  return {
    formData,
    errors,
    touchedFields,
    isValidating,
    validateField,
    validateAllFields,
    setFieldValue,
    resetForm,
    getFormattedData,
  }
}
