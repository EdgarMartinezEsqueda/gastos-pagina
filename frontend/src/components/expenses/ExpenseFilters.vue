<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 space-y-4 sm:flex sm:items-end sm:space-x-4 sm:space-y-0">
    <div class="flex-1">
      <label for="search" class="block text-sm font-medium leading-6 text-gray-900 mb-1">Buscar</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchQuery"
          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          placeholder="Buscar gastos..."
        />
      </div>
    </div>

    <div class="w-full sm:w-64">
      <label for="category-filter" class="block text-sm font-medium leading-6 text-gray-900 mb-1">Categoría</label>
      <USelect
        v-model="selectedCategory"
        :options="filterOptions"
        placeholder="Todas las categorías"
      />
    </div>

    <div class="sm:flex-none">
      <UButton
        color="white"
        @click="clearFilters"
        :disabled="!hasActiveFilters"
        class="w-full sm:w-auto"
      >
        Limpiar Filtros
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import UButton from "@/components/ui/UButton.vue"
import USelect from "@/components/ui/USelect.vue"
import type { ExpenseCategory } from "@/types/expense"
import { CATEGORY_OPTIONS } from "@/utils/constants"
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
import { computed } from "vue"

const props = defineProps<{
  modelValue: string
  category: ExpenseCategory | ""
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
  (e: "update:category", value: ExpenseCategory | ""): void
  (e: "clear"): void
}>()

const searchQuery = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})

const selectedCategory = computed({
  get: () => props.category,
  set: (val) => emit("update:category", val as ExpenseCategory | "")
})

const filterOptions = [
  { label: "Todas las categorías", value: "" },
  ...CATEGORY_OPTIONS
]

const hasActiveFilters = computed(() => {
  return props.modelValue !== "" || props.category !== ""
})

const clearFilters = () => {
  emit("clear")
}
</script>
