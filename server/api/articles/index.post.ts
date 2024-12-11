import { db } from '~/server/db'
import { articles, articleTags, tags } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const article = await db.transaction(async (tx) => {
    // Insert article
    const [newArticle] = await tx
      .insert(articles)
      .values({
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl
      })
      .returning()

    // Handle tags
    for (const tagName of body.tags) {
      // Insert tag if it doesn't exist
      const [tag] = await tx
        .insert(tags)
        .values({ name: tagName })
        .onConflictDoUpdate({ 
          target: tags.name,
          set: { name: tagName }
        })
        .returning()

      // Create article-tag relationship
      await tx
        .insert(articleTags)
        .values({
          articleId: newArticle.id,
          tagId: tag.id
        })
    }

    return newArticle
  })

  return article
})