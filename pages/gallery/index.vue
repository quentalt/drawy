<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Drawing Gallery</h1>
      <CreateArticleButton />
    </div>
    <MasonryGrid :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import MasonryGrid from '~/components/gallery/MasonryGrid.vue'
import CreateArticleButton from '~/components/article/CreateArticleButton.vue'

const { data: articles } = await useFetch('/api/articles')
</script>