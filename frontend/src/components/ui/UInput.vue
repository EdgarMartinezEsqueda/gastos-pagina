<template>
  <div class="relative">
    <label v-if="label" :for="id" class="block text-sm font-medium leading-6 text-gray-900 mb-1">{{ label }}</label>
    <div class="relative mt-1">
      <div
        v-if="icon || $slots.leading"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="leading">
          <component :is="icon" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </slot>
      </div>
      <input
        :id="id"
        :name="name"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
        :class="[
          (icon || $slots.leading) ? 'pl-10' : 'pl-3',
          ($slots.trailing || error) ? 'pr-10' : 'pr-3',
          error ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500' : ''
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
      />
      <div
        v-if="error || $slots.trailing"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <slot name="trailing">
          <svg v-if="error" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
        </slot>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  modelValue?: string | number
  type?: string
  id?: string
  name?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  icon?: Component
}>()

defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>
