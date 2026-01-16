<template>
  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
    <table class="min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Descripción</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Monto</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha</th>
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categoría</th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span class="sr-only">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <template v-if="loading">
          <tr v-for="i in 5" :key="i">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              <div class="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <div class="h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto"></div>
            </td>
          </tr>
        </template>
        <template v-else-if="expenses.length">
          <tr v-for="expense in expenses" :key="expense.id" class="hover:bg-gray-50">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              #{{ expense.id }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate" :title="expense.description">
              {{ expense.description }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
              {{ formatCurrency(expense.amount) }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ formatDate(expense.date) }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {{ formatCategory(expense.category) }}
              </span>
            </td>
            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <div class="flex justify-end space-x-2">
                <button
                  @click="$emit("edit", expense)"
                  class="text-primary-600 hover:text-primary-900 p-1 hover:bg-primary-50 rounded"
                  title="Editar"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button
                  @click="$emit("delete", expense)"
                  class="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                  title="Eliminar"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6" class="py-10">
            <EmptyState
              title="No hay gastos"
              description="No se encontraron gastos registrados con los filtros actuales."
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline"
import type { Expense } from "@/types/expense"
import { formatCurrency, formatDate, formatCategory } from "@/utils/formatters"
import EmptyState from "@/components/common/EmptyState.vue"

defineProps<{
  expenses: Expense[]
  loading: boolean
}>()

defineEmits<{
  (e: "edit", expense: Expense): void
  (e: "delete", expense: Expense): void
}>()
</script>
