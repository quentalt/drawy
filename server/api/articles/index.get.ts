import { db } from '~/server/db'
import { articles, articleTags, tags } from '~/server/db/schema'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { selectedTags, startDate, endDate } = query

    let articlesQuery = db
        .select({
            id: articles.id,
            title: articles.title,
            content: articles.content,
            imageUrl: articles.imageUrl,
            createdAt: articles.createdAt,
            tags: sql<string[]>`group_concat(${tags.name})`
        })
        .from(articles)
        .leftJoin(articleTags, eq(articles.id, articleTags.articleId))
        .leftJoin(tags, eq(articleTags.tagId, tags.id))
        .groupBy(articles.id)
        .orderBy(sql`${articles.createdAt} DESC`)

    if (selectedTags) {
        const tagList = Array.isArray(selectedTags) ? selectedTags : [selectedTags]
        articlesQuery = articlesQuery.where(sql`${tags.name} IN ${tagList}`)
    }

    if (startDate) {
        articlesQuery = articlesQuery.where(sql`${articles.createdAt} >= ${startDate}`)
    }

    if (endDate) {
        articlesQuery = articlesQuery.where(sql`${articles.createdAt} <= ${endDate}`)
    }

    const results = await articlesQuery

    // Convert comma-separated tags string to array for each article
    return results.map(article => ({
        ...article,
        tags: article.tags ? article.tags.split(',') : []
    }))
})