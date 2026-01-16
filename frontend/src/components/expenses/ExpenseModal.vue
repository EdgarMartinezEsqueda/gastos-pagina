<template>
  <UModal v-model="isOpen" :prevent-close="loading">
    <div>
      <div class="border-b border-gray-200 pb-4 mb-4">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          {{ isEditing ? "Editar Gasto" : "Nuevo Gasto" }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ isEditing ? "Modifica los detalles del gasto seleccionado." : "Completa el formulario para registrar un nuevo gasto." }}
        </p>
      </div>
      
      <ExpenseForm
        :initial-data="expense"
        :loading="loading"
        @submit="$emit("save", $event)"
        @cancel="close"
      />
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { computed } from "vue"
import UModal from "@/components/ui/UModal.vue"
import ExpenseForm from "./ExpenseForm.vue"
import type { Expense } from "@/types/expense"

const props = defineProps<{
  modelValue: boolean
  expense: Expense | null
  loading: boolean
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "save", data: any): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
})

const isEditing = computed(() => !!props.expense)

const close = () => {
  if (!props.loading) {
    isOpen.value = false
  }
}
</script>
