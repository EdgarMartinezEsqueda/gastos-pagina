<template>
  <div class="overflow-hidden rounded-lg bg-white shadow ring-1 ring-gray-900/5">
    <div v-if="$slots.header" class="border-b border-gray-200 px-4 py-5 sm:px-6">
      <slot name="header"></slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="border-t border-gray-200 px-4 py-4 sm:px-6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// Simple Card container
</script>
