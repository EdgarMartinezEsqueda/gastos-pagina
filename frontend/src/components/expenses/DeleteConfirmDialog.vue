<template>
  <UModal v-model="isOpen" :prevent-close="loading">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 class="text-base font-semibold leading-6 text-gray-900">Eliminar Gasto</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            ¿Estás seguro de que quieres eliminar este gasto? Esta acción no se puede deshacer.
          </p>
          <div v-if="expense" class="mt-3 bg-gray-50 p-3 rounded-md text-left">
            <p class="text-sm font-medium text-gray-900">{{ expense.description }}</p>
            <p class="text-sm text-gray-500">{{ formatCurrency(expense.amount) }} - {{ formatDate(expense.date) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
      <UButton
        color="red"
        class="w-full sm:ml-3 sm:w-auto"
        :loading="loading"
        @click="$emit("confirm")"
      >
        Eliminar
      </UButton>
      <UButton
        variant="white"
        class="mt-3 w-full sm:mt-0 sm:w-auto"
        @click="close"
        :disabled="loading"
      >
        Cancelar
      </UButton>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import UModal from "@/components/ui/UModal.vue"
import UButton from "@/components/ui/UButton.vue"
import type { Expense } from "@/types/expense"
import { formatCurrency, formatDate } from "@/utils/formatters"

const props = defineProps<{
  modelValue: boolean
  expense: Expense | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "confirm"): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})

const close = () => {
  if (!props.loading) {
    isOpen.value = false
  }
}
</script>
