<template>
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
    <div
        v-for="article in articles"
        :key="article.id"
        class="break-inside-avoid"
    >
      <NuxtLink
          :to="`/articles/${article.id}`"
          v-if="article.imageUrl"
          class="block group"
      >
        <div class="relative overflow-hidden rounded-lg">
          <img
              :src="article.imageUrl"
              :alt="article.title"
              class="w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 class="text-white font-medium">{{ article.title }}</h3>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  articles: Array<{
    id: number
    title: string
    imageUrl?: string
    tags: string[]
  }>
}>()
</script>