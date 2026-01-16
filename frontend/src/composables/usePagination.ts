import { computed, ref } from "vue"

export function usePagination(initialPage = 1, initialLimit = 10) {
  const currentPage = ref(initialPage)
  const itemsPerPage = ref(initialLimit)
  const totalItems = ref(0)

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value)
  })

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value
  })

  const hasPrevPage = computed(() => {
    return currentPage.value > 1
  })

  const startItem = computed(() => {
    if (totalItems.value === 0) return 0
    return (currentPage.value - 1) * itemsPerPage.value + 1
  })

  const endItem = computed(() => {
    const end = currentPage.value * itemsPerPage.value
    return Math.min(end, totalItems.value)
  })

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const goToFirstPage = () => {
    currentPage.value = 1
  }

  const goToLastPage = () => {
    currentPage.value = totalPages.value
  }

  const changeItemsPerPage = (newLimit: number) => {
    itemsPerPage.value = newLimit
    currentPage.value = 1 // Reset to first page
  }

  const setTotalItems = (total: number) => {
    totalItems.value = total
  }

  const reset = () => {
    currentPage.value = initialPage
    itemsPerPage.value = initialLimit
    totalItems.value = 0
  }

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPrevPage,
    startItem,
    endItem,
    nextPage,
    prevPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    changeItemsPerPage,
    setTotalItems,
    reset,
  }
}
