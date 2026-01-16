<template>
  <component :is="name" class="h-5 w-5" aria-hidden="true" />
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  name: Component
}>()
</script>
