<template>
  <AppLayout>
    <template #header>
      <AppHeader title="Gestión de Gastos">
        <template #actions>
          <UButton @click="openCreateModal">
            <template #leading>
              <PlusIcon class="h-5 w-5 mr-2" />
            </template>
            Nuevo Gasto
          </UButton>
        </template>
      </AppHeader>
    </template>

    <div class="space-y-6">
      
      <!-- Filtros -->
      <ExpenseFilters
        v-model="searchQuery"
        v-model:category="selectedCategory"
        @clear="clearFilters"
      />

      <!-- Tabla (Desktop) -->
      <div class="hidden md:block">
        <ExpenseTable
          :expenses="expenses"
          :loading="loading"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Cards (Mobile) -->
      <div class="md:hidden">
        <ExpenseCard
          :expenses="expenses"
          :loading="loading"
          @edit="openEditModal"
          @delete="openDeleteModal"
        />
      </div>

      <!-- Paginación -->
      <div v-if="totalPages > 1 || loading" class="mt-6">
        <Pagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :total-items="totalItems"
          :items-per-page="itemsPerPage"
          :start-item="startItem"
          :end-item="endItem"
          :has-next="hasNextPage"
          :has-prev="hasPrevPage"
        />
      </div>

      <!-- Modales -->
      <ExpenseModal
        v-model="showFormModal"
        :expense="selectedExpense"
        :loading="actionLoading"
        @save="handleSave"
      />

      <DeleteConfirmDialog
        v-model="showDeleteModal"
        :expense="selectedExpense"
        :loading="actionLoading"
        @confirm="handleDelete"
      />
      
    </div>
  </AppLayout>

  <!-- Toast Container (Global) -->
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition-group
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="toast.type === 'success'" class="h-6 w-6 text-green-400" aria-hidden="true" />
                <XCircleIcon v-else-if="toast.type === 'error'" class="h-6 w-6 text-red-400" aria-hidden="true" />
                <InformationCircleIcon v-else-if="toast.type === 'info'" class="h-6 w-6 text-blue-400" aria-hidden="true" />
                <ExclamationTriangleIcon v-else class="h-6 w-6 text-yellow-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ toast.message }}</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="removeToast(toast.id)"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import { onMounted, ref, watch } from "vue"

import Pagination from "@/components/common/Pagination.vue"
import AppHeader from "@/components/layout/AppHeader.vue"
import AppLayout from "@/components/layout/AppLayout.vue"
import UButton from "@/components/ui/UButton.vue"

import DeleteConfirmDialog from "@/components/expenses/DeleteConfirmDialog.vue"
import ExpenseCard from "@/components/expenses/ExpenseCard.vue"
import ExpenseFilters from "@/components/expenses/ExpenseFilters.vue"
import ExpenseModal from "@/components/expenses/ExpenseModal.vue"
import ExpenseTable from "@/components/expenses/ExpenseTable.vue"

import { useExpenses } from "@/composables/useExpenses"
import { useFilters } from "@/composables/useFilters"
import { usePagination } from "@/composables/usePagination"
import { useToast } from "@/composables/useToast"
import type { Expense } from "@/types/expense"

// Composables
const {
  expenses,
  loading,
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  totalItems,
} = useExpenses()
// Note: apiTotalPages from useExpenses isn't reactive to Pagination state change directly,
// but fetchExpenses updates it.

const {
  currentPage,
  itemsPerPage,
  startItem,
  endItem,
  hasNextPage,
  hasPrevPage,
  totalPages, // Computed from totalItems
  setTotalItems
} = usePagination()

const {
  searchQuery,
  debouncedQuery,
  selectedCategory,
  clearFilters
} = useFilters()

const { toasts, removeToast } = useToast()

// Local State
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const selectedExpense = ref<Expense | null>(null)
const actionLoading = ref(false)

// Lifecycle
onMounted(() => {
  loadData()
})

// Watchers for refetching
watch([currentPage, itemsPerPage, debouncedQuery, selectedCategory], () => {
  loadData()
})

// Sync total items from API to Pagination
watch(totalItems, (newTotal) => {
  setTotalItems(newTotal)
})

// Actions
const loadData = async () => {
  const params = {
    page: currentPage.value,
    limit: itemsPerPage.value,
    category: selectedCategory.value || undefined,
    query: debouncedQuery.value || undefined
  }
  await fetchExpenses(params)
}

const openCreateModal = () => {
  selectedExpense.value = null
  showFormModal.value = true
}

const openEditModal = (expense: Expense) => {
  selectedExpense.value = expense
  showFormModal.value = true
}

const openDeleteModal = (expense: Expense) => {
  selectedExpense.value = expense
  showDeleteModal.value = true
}

const handleSave = async (data: any) => {
  actionLoading.value = true
  let success = false

  if (selectedExpense.value) {
    success = await updateExpense(selectedExpense.value.id, data)
  } else {
    success = await createExpense(data)
  }

  actionLoading.value = false
  if (success) {
    showFormModal.value = false
    loadData() // Refresh list
  }
}

const handleDelete = async () => {
  if (!selectedExpense.value) return

  actionLoading.value = true
  const success = await deleteExpense(selectedExpense.value.id)
  
  actionLoading.value = false
  if (success) {
    showDeleteModal.value = false
    loadData() // Refresh list
  }
}
</script>
