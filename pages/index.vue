<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Welcome to Drawing Blog</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: articles } = await useFetch('/api/articles')
</script>