<template>
  <div class="min-h-full bg-gray-100">
    <slot name="header"></slot>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout component container
</script>
