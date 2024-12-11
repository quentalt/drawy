<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Create New Article</h1>
    <form @submit.prevent="submitArticle" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title</label>
        <input
            v-model="article.title"
            required
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <RichTextEditor v-model="article.content" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Image</label>
          <div class="mt-1 flex items-center">
            <div v-if="article.imageUrl" class="relative">
              <img
                  :src="article.imageUrl"
                  class="h-32 w-32 object-cover rounded-lg"
                  alt="Preview"
              />
              <button
                  type="button"
                  @click="removeImage"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
            <label
                v-else
                class="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <PhotoIcon class="w-8 h-8 text-gray-400" />
                <p class="text-xs text-gray-500">Upload image</p>
              </div>
              <input type="file" class="hidden" @change="handleImageUpload" accept="image/*" />
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tags</label>
          <div class="mt-1">
            <input
                v-model="tagInput"
                @keydown.enter.prevent="addTag"
                type="text"
                placeholder="Press Enter to add tags"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
              >
                {{ tag }}
                <button
                    type="button"
                    @click="removeTag(tag)"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button
            type="button"
            @click="router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span v-if="isSubmitting">Creating...</span>
          <span v-else>Create Article</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { PhotoIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const article = ref({
  title: '',
  content: '',
  imageUrl: '',
  tags: [] as string[]
})

const tagInput = ref('')
const router = useRouter()
const isSubmitting = ref(false)

const addTag = () => {
  if (tagInput.value.trim() && !article.value.tags.includes(tagInput.value.trim())) {
    article.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (tag: string) => {
  article.value.tags = article.value.tags.filter(t => t !== tag)
}

const removeImage = () => {
  article.value.imageUrl = ''
}

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const formData = new FormData()
    formData.append('image', file)
    const { data } = await useFetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    if (data.value) {
      article.value.imageUrl = data.value.url
    }
  }
}

const submitArticle = async () => {
  if (!article.value.title.trim() || !article.value.content.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    const { data } = await useFetch('/api/articles', {
      method: 'POST',
      body: article.value
    })
    if (data.value) {
      router.push(`/articles/${data.value.id}`)
    }
  } catch (error) {
    console.error('Failed to create article:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
