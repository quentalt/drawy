<template>
  <button
      :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : '',
      variant === 'secondary' ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' : '',
      className
    ]"
      v-bind="$attrs"
  >
    <div class="flex items-center gap-2">
      <slot name="icon"></slot>
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  className?: string
}>()
</script>