<template>
  <div class="space-y-4">
    <template v-if="loading">
      <div v-for="i in 3" :key="i" class="bg-white overflow-hidden shadow rounded-lg p-5">
        <div class="flex justify-between items-start">
          <div class="space-y-3 w-full">
            <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </template>
    
    <template v-else-if="expenses.length">
      <div v-for="expense in expenses" :key="expense.id" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {{ formatCategory(expense.category) }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ formatDate(expense.date) }}
                </span>
              </div>
              <h3 class="mt-2 text-lg font-medium leading-6 text-gray-900">{{ expense.description }}</h3>
              <p class="mt-1 text-xl font-bold text-gray-900">{{ formatCurrency(expense.amount) }}</p>
            </div>
          </div>
          <div class="mt-4 flex space-x-3 border-t border-gray-100 pt-4">
            <UButton
              variant="outline"
              color="primary"
              class="flex-1 justify-center"
              @click="$emit("edit", expense)"
            >
              <template #leading>
                <PencilIcon class="h-4 w-4 mr-1" />
              </template>
              Editar
            </UButton>
            <UButton
              variant="outline"
              color="red"
              class="flex-1 justify-center"
              @click="$emit("delete", expense)"
            >
              <template #leading>
                <TrashIcon class="h-4 w-4 mr-1" />
              </template>
              Eliminar
            </UButton>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="py-10 bg-white rounded-lg shadow">
      <EmptyState
        title="No hay gastos"
        description="No se encontraron gastos registrados con los filtros actuales."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline"
import type { Expense } from "@/types/expense"
import { formatCurrency, formatDate, formatCategory } from "@/utils/formatters"
import EmptyState from "@/components/common/EmptyState.vue"
import UButton from "@/components/ui/UButton.vue"

defineProps<{
  expenses: Expense[]
  loading: boolean
}>()

defineEmits<{
  (e: "edit", expense: Expense): void
  (e: "delete", expense: Expense): void
}>()
</script>
