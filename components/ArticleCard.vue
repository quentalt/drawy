<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div class="relative">
      <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          :alt="article.title"
          class="w-full h-48 object-cover"
      />
      <div
          v-if="isNew"
          class="absolute top-2 right-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded"
      >
        NEW
      </div>
    </div>
    <div class="p-6">
      <div class="flex flex-wrap gap-2 mb-3">
        <span
            v-for="tag in article.tags"
            :key="tag"
            class="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <h2 class="text-xl font-bold mb-2 hover:text-primary">
        <NuxtLink :to="'/articles/' + article.id">{{ article.title }}</NuxtLink>
      </h2>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ article.content }}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500" :title="formatDate(article.createdAt)">
          {{ formatRelativeDate(article.createdAt) }}
        </span>
        <NuxtLink
            :to="'/articles/' + article.id"
            class="inline-flex items-center text-primary hover:text-primary-dark font-medium"
        >
          Read more
          <ArrowRightIcon class="w-4 h-4 ml-1" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { formatDate, formatRelativeDate } from '~/utils/date'

interface Article {
  id: number
  title: string
  content: string
  imageUrl?: string
  createdAt: string
  tags: string[]
}

const props = defineProps<{
  article: Article
}>()

const isNew = computed(() => {
  const articleDate = new Date(props.article.createdAt)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - articleDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
})
</script>