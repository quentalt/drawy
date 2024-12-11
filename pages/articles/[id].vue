<template>
  <div v-if="article" class="max-w-3xl mx-auto">
    <div class="mb-6">
      <NuxtLink
          to="/articles"
          class="text-gray-600 hover:text-primary flex items-center gap-1"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Back to Articles
      </NuxtLink>
    </div>

    <article class="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          :alt="article.title"
          class="w-full h-64 object-cover"
      />

      <div class="p-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
          >
            {{ tag }}
          </span>
        </div>

        <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>

        <div class="mb-6 text-gray-500">
          Published {{ formatDate(article.createdAt) }}
        </div>

        <div
            class="prose prose-lg max-w-none"
            v-html="article.content"
        ></div>
      </div>
    </article>
  </div>

  <div v-else class="max-w-3xl mx-auto text-center py-12">
    <ExclamationTriangleIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
    <p class="text-gray-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
    <NuxtLink to="/articles">
      <Button variant="primary">Back to Articles</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { formatDate } from '~/utils/date'
import Button from '~/components/ui/Button.vue'

const route = useRoute()
const { data: article } = await useFetch(`/api/articles/${route.params.id}`)
</script>

<style>
.prose img {
  @apply rounded-lg;
}
</style>