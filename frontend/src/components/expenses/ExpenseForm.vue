<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <UInput
      id="description"
      name="description"
      v-model="formData.description"
      placeholder="Descripción del gasto"
      label="Descripción"
      :error="errors.description"
      @blur="validateField('description')"
    />

    <UInput
      id="amount"
      name="amount"
      type="number"
      v-model="formData.amount"
      placeholder="0.00"
      label="Monto"
      :error="errors.amount"
      @blur="validateField('amount')"
    >
      <template #leading>
        <span class="text-gray-500 sm:text-sm">$</span>
      </template>
    </UInput>

    <UInput
      id="date"
      name="date"
      type="date"
      v-model="formData.date"
      label="Fecha"
      :error="errors.date"
      @blur="validateField('date')"
    />

    <div class="space-y-1">
      <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Categoría</label>
      <USelect
        v-model="formData.category"
        :options="categoryOptions"
        placeholder="Selecciona una categoría"
        :error="errors.category"
      />
    </div>

    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
      <UButton
        variant="white"
        @click="$emit('cancel')"
        :disabled="loading"
      >
        Cancelar
      </UButton>
      <UButton
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        Guardar
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import UButton from "@/components/ui/UButton.vue"
import UInput from "@/components/ui/UInput.vue"
import USelect from "@/components/ui/USelect.vue"
import { useForm } from "@/composables/useForm"
import type { Expense } from "@/types/expense"
import { CATEGORY_OPTIONS } from "@/utils/constants"
import { formatDateForInput } from "@/utils/formatters"
import { watch } from "vue"

const props = defineProps<{
  initialData?: Expense | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: "submit", data: any): void
  (e: "cancel"): void
}>()

const {
  formData,
  errors,
  validateField,
  validateAllFields,
  resetForm,
  getFormattedData,
} = useForm()

const categoryOptions = CATEGORY_OPTIONS

const handleSubmit = () => {
  if (validateAllFields()) {
    emit("submit", getFormattedData())
  }
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    resetForm({
      description: newData.description,
      amount: newData.amount.toString(),
      date: formatDateForInput(newData.date),
      category: newData.category
    })
  } else {
    resetForm()
    // Set default date to today for new expenses
    formData.date = new Date().toISOString().split("T")[0]
  }
}, { immediate: true })
</script>
