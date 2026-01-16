import type { ExpenseCategory } from "@/types/expense"
import { ref, watch } from "vue"

export function useFilters() {
  const searchQuery = ref("")
  const selectedCategory = ref<ExpenseCategory | "">("")
  const debouncedQuery = ref("")

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null

  // Debounce para la búsqueda
  watch(searchQuery, (newValue) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    debounceTimeout = setTimeout(() => {
      debouncedQuery.value = newValue
    }, 300)
  })

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setCategory = (category: ExpenseCategory | "") => {
    selectedCategory.value = category
  }

  const clearFilters = () => {
    searchQuery.value = ""
    debouncedQuery.value = ""
    selectedCategory.value = ""
  }

  const hasActiveFilters = () => {
    return debouncedQuery.value !== "" || selectedCategory.value !== ""
  }

  return {
    searchQuery,
    debouncedQuery,
    selectedCategory,
    setSearchQuery,
    setCategory,
    clearFilters,
    hasActiveFilters,
  }
}
