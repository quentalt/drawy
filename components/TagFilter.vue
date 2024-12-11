<template>
  <div class="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
    <button
      v-for="tag in tags"
      :key="tag"
      @click="toggleTag(tag)"
      :class="[
        'px-3 py-1 rounded-full text-sm font-medium transition-colors',
        selectedTags.includes(tag)
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      ]"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const selectedTags = ref<string[]>([])
const emit = defineEmits(['update:selected'])

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
  } else {
    selectedTags.value.push(tag)
  }
  emit('update:selected', selectedTags.value)
}
</script>