<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Articles</h1>
      <CreateArticleButton />
    </div>

    <div class="mb-8 space-y-4">
      <SearchBar v-model="searchQuery" />

      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <TagFilter
              :tags="allTags"
              v-model:selected="selectedTags"
          />
        </div>
        <div class="flex-1">
          <DateRangeFilter v-model="dateRange" />
        </div>
      </div>
    </div>

    <div v-if="filteredArticles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard
          v-for="article in filteredArticles"
          :key="article.id"
          :article="article"
      />
    </div>

    <div v-else class="text-center py-12">
      <DocumentIcon class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
      <p class="text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DocumentIcon } from '@heroicons/vue/24/outline'
import CreateArticleButton from '~/components/article/CreateArticleButton.vue'

const { data: articles } = await useFetch('/api/articles')
const {
  selectedTags,
  searchQuery,
  dateRange,
  allTags,
  filteredArticles
} = useArticleFilters(articles)
</script>