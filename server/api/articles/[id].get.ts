import { db } from '~/server/db'
import { articles, articleTags, tags } from '~/server/db/schema'
import { eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id)

    const article = await db
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
        .where(eq(articles.id, id))
        .groupBy(articles.id)
        .get()

    if (!article) {
        throw createError({
            statusCode: 404,
            message: 'Article not found'
        })
    }

    // Convert comma-separated tags string to array
    article.tags = article.tags ? article.tags.split(',') : []

    return article
})