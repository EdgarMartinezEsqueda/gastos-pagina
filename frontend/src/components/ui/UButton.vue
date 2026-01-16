<template>
  <button
    :type="type"
    :class="[
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      block ? "w-full" : "",
      sizeClasses[size],
      variantClasses[color][variant]
    ]"
    :disabled="loading || disabled"
    v-bind="$attrs"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot name="leading"></slot>
    <slot>
      {{ label }}
    </slot>
    <slot name="trailing"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<{
  type?: "button" | "submit" | "reset"
  block?: boolean
  loading?: boolean
  disabled?: boolean
  label?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  color?: "primary" | "white" | "gray" | "red" | "green"
  variant?: "solid" | "outline" | "ghost" | "link"
}>(), {
  type: "button",
  block: false,
  loading: false,
  disabled: false,
  size: "sm",
  color: "primary",
  variant: "solid"
})

const sizeClasses = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
  xl: "px-6 py-3.5 text-base",
}

const variantClasses = {
  primary: {
    solid: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600",
    outline: "ring-1 ring-inset ring-primary-600 text-primary-600 hover:bg-primary-50",
    ghost: "text-primary-600 hover:bg-primary-50",
    link: "text-primary-600 underline-offset-4 hover:underline",
  },
  white: {
    solid: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
    outline: "ring-1 ring-inset ring-gray-300 text-gray-900 hover:bg-gray-50",
    ghost: "text-gray-900 hover:bg-gray-50",
    link: "text-gray-900 underline-offset-4 hover:underline",
  },
  gray: {
    solid: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:outline-gray-600",
    outline: "ring-1 ring-inset ring-gray-600 text-gray-600 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-50",
    link: "text-gray-600 underline-offset-4 hover:underline",
  },
  red: {
    solid: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
    outline: "ring-1 ring-inset ring-red-600 text-red-600 hover:bg-red-50",
    ghost: "text-red-600 hover:bg-red-50",
    link: "text-red-600 underline-offset-4 hover:underline",
  },
  green: {
    solid: "bg-green-600 text-white hover:bg-green-700 focus-visible:outline-green-600",
    outline: "ring-1 ring-inset ring-green-600 text-green-600 hover:bg-green-50",
    ghost: "text-green-600 hover:bg-green-50",
    link: "text-green-600 underline-offset-4 hover:underline",
  }
}
</script>
