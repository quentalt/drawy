<template>
  <NuxtLink to="/articles/new">
    <Button variant="primary" class="flex items-center gap-2">
      <template #icon>
        <PlusIcon class="w-5 h-5" />
      </template>
      Create Article
    </Button>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import Button from '../ui/Button.vue'
</script>