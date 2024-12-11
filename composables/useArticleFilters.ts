import { ref, computed } from 'vue'

export function useArticleFilters(articles: Ref<any[]>) {
    const selectedTags = ref<string[]>([])
    const searchQuery = ref('')
    const dateRange = ref({ start: '', end: '' })

    const allTags = computed(() => {
        const tags = new Set<string>()
        articles.value?.forEach(article => {
            article.tags?.forEach((tag: string) => tags.add(tag))
        })
        return Array.from(tags)
    })

    const filteredArticles = computed(() => {
        return articles.value?.filter(article => {
            const matchesTags = selectedTags.value.length === 0 ||
                selectedTags.value.every(tag => article.tags?.includes(tag))

            const matchesSearch = !searchQuery.value ||
                article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.value.toLowerCase())

            const matchesDate = (!dateRange.value.start || new Date(article.createdAt) >= new Date(dateRange.value.start)) &&
                (!dateRange.value.end || new Date(article.createdAt) <= new Date(dateRange.value.end))

            return matchesTags && matchesSearch && matchesDate
        })
    })

    return {
        selectedTags,
        searchQuery,
        dateRange,
        allTags,
        filteredArticles
    }
}